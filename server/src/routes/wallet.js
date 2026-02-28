import { Router } from 'express';

export default function walletRouter(db) {
  const router = Router();

  function calculateCardmemberYear(openDate) {
    const open = new Date(openDate);
    const now = new Date();
    
    let yearStart = new Date(open);
    yearStart.setFullYear(now.getFullYear());
    
    if (yearStart > now) {
      yearStart.setFullYear(yearStart.getFullYear() - 1);
    }
    
    const yearEnd = new Date(yearStart);
    yearEnd.setFullYear(yearEnd.getFullYear() + 1);
    yearEnd.setDate(yearEnd.getDate() - 1);
    
    const daysRemaining = Math.ceil((yearEnd - now) / (1000 * 60 * 60 * 24));
    const totalDays = Math.ceil((yearEnd - yearStart) / (1000 * 60 * 60 * 24));
    const daysElapsed = totalDays - daysRemaining;
    
    return {
      yearStart: yearStart.toISOString().split('T')[0],
      yearEnd: yearEnd.toISOString().split('T')[0],
      daysRemaining,
      daysElapsed,
      totalDays,
    };
  }

  // Get all cards in user's wallet
  router.get('/', (req, res) => {
    try {
      const userId = req.query.userId;
      
      if (!userId) {
        return res.status(400).json({ error: 'userId is required' });
      }

      const userCards = db.prepare(`
        SELECT 
          uc.id,
          uc.open_date,
          uc.nickname,
          uc.created_at,
          ct.id as template_id,
          ct.name,
          ct.issuer,
          ct.annual_fee,
          ct.image_color
        FROM user_cards uc
        JOIN card_templates ct ON uc.card_template_id = ct.id
        WHERE uc.user_id = ?
        ORDER BY uc.created_at DESC
      `).all(userId);

      const result = userCards.map(card => {
        const benefits = db.prepare(`
          SELECT * FROM card_benefits WHERE card_template_id = ?
        `).all(card.template_id);

        const cardmemberYear = calculateCardmemberYear(card.open_date);

        const benefitsWithUsage = benefits.map(benefit => {
          const usage = db.prepare(`
            SELECT COALESCE(SUM(amount_used), 0) as total_used
            FROM benefit_usage
            WHERE user_card_id = ? 
              AND benefit_id = ?
              AND used_date >= ?
              AND used_date <= ?
          `).get(card.id, benefit.id, cardmemberYear.yearStart, cardmemberYear.yearEnd);

          const usageHistory = db.prepare(`
            SELECT id, amount_used, used_date, notes
            FROM benefit_usage
            WHERE user_card_id = ?
              AND benefit_id = ?
              AND used_date >= ?
              AND used_date <= ?
            ORDER BY used_date DESC
          `).all(card.id, benefit.id, cardmemberYear.yearStart, cardmemberYear.yearEnd);

          return {
            id: benefit.id,
            name: benefit.name,
            description: benefit.description,
            type: benefit.type,
            value: benefit.value,
            maxValue: benefit.max_value,
            category: benefit.category,
            resetPeriod: benefit.reset_period,
            used: usage.total_used,
            usageHistory,
          };
        });

        const totalBenefitsUsed = benefitsWithUsage
          .filter(b => b.type === 'credit' || b.type === 'perk')
          .reduce((sum, b) => sum + Math.min(b.used, b.maxValue || b.value), 0);

        const netValue = totalBenefitsUsed - card.annual_fee;

        return {
          id: card.id,
          templateId: card.template_id,
          name: card.name,
          issuer: card.issuer,
          annualFee: card.annual_fee,
          imageColor: card.image_color,
          openDate: card.open_date,
          nickname: card.nickname,
          cardmemberYear,
          benefits: benefitsWithUsage,
          totalBenefitsUsed,
          netValue,
        };
      });

      res.json(result);
    } catch (error) {
      console.error('Error fetching wallet:', error);
      res.status(500).json({ error: 'Failed to fetch wallet' });
    }
  });

  // Get single card from wallet
  router.get('/:id', (req, res) => {
    try {
      const userId = req.query.userId;
      
      if (!userId) {
        return res.status(400).json({ error: 'userId is required' });
      }

      const card = db.prepare(`
        SELECT 
          uc.id,
          uc.open_date,
          uc.nickname,
          ct.id as template_id,
          ct.name,
          ct.issuer,
          ct.annual_fee,
          ct.image_color
        FROM user_cards uc
        JOIN card_templates ct ON uc.card_template_id = ct.id
        WHERE uc.id = ? AND uc.user_id = ?
      `).get(req.params.id, userId);

      if (!card) {
        return res.status(404).json({ error: 'Card not found in wallet' });
      }

      const benefits = db.prepare(`
        SELECT * FROM card_benefits WHERE card_template_id = ?
      `).all(card.template_id);

      const cardmemberYear = calculateCardmemberYear(card.open_date);

      const benefitsWithUsage = benefits.map(benefit => {
        const usage = db.prepare(`
          SELECT COALESCE(SUM(amount_used), 0) as total_used
          FROM benefit_usage
          WHERE user_card_id = ? 
            AND benefit_id = ?
            AND used_date >= ?
            AND used_date <= ?
        `).get(card.id, benefit.id, cardmemberYear.yearStart, cardmemberYear.yearEnd);

        const usageHistory = db.prepare(`
          SELECT id, amount_used, used_date, notes
          FROM benefit_usage
          WHERE user_card_id = ?
            AND benefit_id = ?
            AND used_date >= ?
            AND used_date <= ?
          ORDER BY used_date DESC
        `).all(card.id, benefit.id, cardmemberYear.yearStart, cardmemberYear.yearEnd);

        return {
          id: benefit.id,
          name: benefit.name,
          description: benefit.description,
          type: benefit.type,
          value: benefit.value,
          maxValue: benefit.max_value,
          category: benefit.category,
          resetPeriod: benefit.reset_period,
          used: usage.total_used,
          usageHistory,
        };
      });

      const totalBenefitsUsed = benefitsWithUsage
        .filter(b => b.type === 'credit' || b.type === 'perk')
        .reduce((sum, b) => sum + Math.min(b.used, b.maxValue || b.value), 0);

      const netValue = totalBenefitsUsed - card.annual_fee;

      res.json({
        id: card.id,
        templateId: card.template_id,
        name: card.name,
        issuer: card.issuer,
        annualFee: card.annual_fee,
        imageColor: card.image_color,
        openDate: card.open_date,
        nickname: card.nickname,
        cardmemberYear,
        benefits: benefitsWithUsage,
        totalBenefitsUsed,
        netValue,
      });
    } catch (error) {
      console.error('Error fetching card:', error);
      res.status(500).json({ error: 'Failed to fetch card' });
    }
  });

  // Add card to wallet
  router.post('/', (req, res) => {
    try {
      const { userId, cardTemplateId, openDate, nickname } = req.body;

      if (!userId || !cardTemplateId || !openDate) {
        return res.status(400).json({ error: 'userId, cardTemplateId and openDate are required' });
      }

      const template = db.prepare('SELECT id FROM card_templates WHERE id = ?').get(cardTemplateId);
      if (!template) {
        return res.status(404).json({ error: 'Card template not found' });
      }

      const result = db.prepare(`
        INSERT INTO user_cards (user_id, card_template_id, open_date, nickname)
        VALUES (?, ?, ?, ?)
      `).run(userId, cardTemplateId, openDate, nickname || null);

      res.status(201).json({ id: result.lastInsertRowid });
    } catch (error) {
      console.error('Error adding card to wallet:', error);
      res.status(500).json({ error: 'Failed to add card to wallet' });
    }
  });

  // Update card in wallet
  router.put('/:id', (req, res) => {
    try {
      const { userId, openDate, nickname } = req.body;

      if (!userId) {
        return res.status(400).json({ error: 'userId is required' });
      }

      const card = db.prepare('SELECT id FROM user_cards WHERE id = ? AND user_id = ?').get(req.params.id, userId);
      if (!card) {
        return res.status(404).json({ error: 'Card not found' });
      }

      db.prepare(`
        UPDATE user_cards SET open_date = ?, nickname = ? WHERE id = ? AND user_id = ?
      `).run(openDate, nickname || null, req.params.id, userId);

      res.json({ success: true });
    } catch (error) {
      console.error('Error updating card:', error);
      res.status(500).json({ error: 'Failed to update card' });
    }
  });

  // Remove card from wallet
  router.delete('/:id', (req, res) => {
    try {
      const userId = req.query.userId;

      if (!userId) {
        return res.status(400).json({ error: 'userId is required' });
      }

      const card = db.prepare('SELECT id FROM user_cards WHERE id = ? AND user_id = ?').get(req.params.id, userId);
      if (!card) {
        return res.status(404).json({ error: 'Card not found' });
      }

      db.prepare('DELETE FROM user_cards WHERE id = ? AND user_id = ?').run(req.params.id, userId);
      res.json({ success: true });
    } catch (error) {
      console.error('Error removing card:', error);
      res.status(500).json({ error: 'Failed to remove card' });
    }
  });

  return router;
}
