import { Router } from 'express';

export default function cardsRouter(db) {
  const router = Router();

  // Get all card templates (global + user's custom cards)
  router.get('/', (req, res) => {
    try {
      const userId = req.query.userId;

      // Get global cards (user_id IS NULL) and user's custom cards
      const cards = db.prepare(`
        SELECT 
          ct.*,
          json_group_array(
            json_object(
              'id', cb.id,
              'name', cb.name,
              'description', cb.description,
              'type', cb.type,
              'value', cb.value,
              'maxValue', cb.max_value,
              'category', cb.category,
              'resetPeriod', cb.reset_period
            )
          ) as benefits
        FROM card_templates ct
        LEFT JOIN card_benefits cb ON ct.id = cb.card_template_id
        WHERE ct.user_id IS NULL ${userId ? 'OR ct.user_id = ?' : ''}
        GROUP BY ct.id
        ORDER BY ct.issuer, ct.annual_fee DESC
      `).all(userId ? [userId] : []);

      const result = cards.map(card => ({
        id: card.id,
        name: card.name,
        issuer: card.issuer,
        annualFee: card.annual_fee,
        isCustom: Boolean(card.is_custom),
        userId: card.user_id,
        imageColor: card.image_color,
        benefits: JSON.parse(card.benefits).filter(b => b.id !== null),
      }));

      res.json(result);
    } catch (error) {
      console.error('Error fetching cards:', error);
      res.status(500).json({ error: 'Failed to fetch cards' });
    }
  });

  // Get single card template
  router.get('/:id', (req, res) => {
    try {
      const card = db.prepare(`
        SELECT * FROM card_templates WHERE id = ?
      `).get(req.params.id);

      if (!card) {
        return res.status(404).json({ error: 'Card not found' });
      }

      const benefits = db.prepare(`
        SELECT * FROM card_benefits WHERE card_template_id = ?
      `).all(req.params.id);

      res.json({
        id: card.id,
        name: card.name,
        issuer: card.issuer,
        annualFee: card.annual_fee,
        isCustom: Boolean(card.is_custom),
        userId: card.user_id,
        imageColor: card.image_color,
        benefits: benefits.map(b => ({
          id: b.id,
          name: b.name,
          description: b.description,
          type: b.type,
          value: b.value,
          maxValue: b.max_value,
          category: b.category,
          resetPeriod: b.reset_period,
        })),
      });
    } catch (error) {
      console.error('Error fetching card:', error);
      res.status(500).json({ error: 'Failed to fetch card' });
    }
  });

  // Create custom card template
  router.post('/', (req, res) => {
    try {
      const { userId, name, issuer, annualFee, imageColor, benefits } = req.body;

      if (!userId) {
        return res.status(400).json({ error: 'userId is required' });
      }

      const result = db.prepare(`
        INSERT INTO card_templates (name, issuer, annual_fee, is_custom, user_id, image_color)
        VALUES (?, ?, ?, 1, ?, ?)
      `).run(name, issuer, annualFee || 0, userId, imageColor || '#4F46E5');

      const cardId = result.lastInsertRowid;

      if (benefits && benefits.length > 0) {
        const insertBenefit = db.prepare(`
          INSERT INTO card_benefits (card_template_id, name, description, type, value, max_value, category)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `);

        for (const benefit of benefits) {
          insertBenefit.run(
            cardId,
            benefit.name,
            benefit.description || null,
            benefit.type,
            benefit.value,
            benefit.maxValue || null,
            benefit.category || null
          );
        }
      }

      res.status(201).json({ id: cardId });
    } catch (error) {
      console.error('Error creating card:', error);
      res.status(500).json({ error: 'Failed to create card' });
    }
  });

  // Update card template (only custom cards owned by user)
  router.put('/:id', (req, res) => {
    try {
      const { userId, name, issuer, annualFee, imageColor, benefits } = req.body;
      const cardId = req.params.id;

      if (!userId) {
        return res.status(400).json({ error: 'userId is required' });
      }

      // Check ownership
      const card = db.prepare('SELECT * FROM card_templates WHERE id = ?').get(cardId);
      if (!card) {
        return res.status(404).json({ error: 'Card not found' });
      }

      if (card.user_id !== null && card.user_id !== parseInt(userId)) {
        return res.status(403).json({ error: 'Not authorized to edit this card' });
      }

      if (!card.is_custom) {
        return res.status(400).json({ error: 'Cannot edit built-in cards' });
      }

      db.prepare(`
        UPDATE card_templates 
        SET name = ?, issuer = ?, annual_fee = ?, image_color = ?
        WHERE id = ?
      `).run(name, issuer, annualFee || 0, imageColor || '#4F46E5', cardId);

      db.prepare('DELETE FROM card_benefits WHERE card_template_id = ?').run(cardId);

      if (benefits && benefits.length > 0) {
        const insertBenefit = db.prepare(`
          INSERT INTO card_benefits (card_template_id, name, description, type, value, max_value, category)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `);

        for (const benefit of benefits) {
          insertBenefit.run(
            cardId,
            benefit.name,
            benefit.description || null,
            benefit.type,
            benefit.value,
            benefit.maxValue || null,
            benefit.category || null
          );
        }
      }

      res.json({ success: true });
    } catch (error) {
      console.error('Error updating card:', error);
      res.status(500).json({ error: 'Failed to update card' });
    }
  });

  // Delete custom card template
  router.delete('/:id', (req, res) => {
    try {
      const userId = req.query.userId;

      if (!userId) {
        return res.status(400).json({ error: 'userId is required' });
      }

      const card = db.prepare('SELECT * FROM card_templates WHERE id = ?').get(req.params.id);
      
      if (!card) {
        return res.status(404).json({ error: 'Card not found' });
      }

      if (!card.is_custom) {
        return res.status(400).json({ error: 'Cannot delete built-in cards' });
      }

      if (card.user_id !== parseInt(userId)) {
        return res.status(403).json({ error: 'Not authorized to delete this card' });
      }

      db.prepare('DELETE FROM card_templates WHERE id = ?').run(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error('Error deleting card:', error);
      res.status(500).json({ error: 'Failed to delete card' });
    }
  });

  return router;
}
