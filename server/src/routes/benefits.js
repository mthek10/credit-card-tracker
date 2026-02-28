import { Router } from 'express';

export default function benefitsRouter(db) {
  const router = Router();

  // Log benefit usage
  router.post('/usage', (req, res) => {
    try {
      const { userId, userCardId, benefitId, amountUsed, usedDate, notes } = req.body;

      if (!userId || !userCardId || !benefitId || amountUsed === undefined || !usedDate) {
        return res.status(400).json({ 
          error: 'userId, userCardId, benefitId, amountUsed, and usedDate are required' 
        });
      }

      // Verify the user owns this card
      const userCard = db.prepare('SELECT id FROM user_cards WHERE id = ? AND user_id = ?').get(userCardId, userId);
      if (!userCard) {
        return res.status(404).json({ error: 'User card not found' });
      }

      const benefit = db.prepare('SELECT id FROM card_benefits WHERE id = ?').get(benefitId);
      if (!benefit) {
        return res.status(404).json({ error: 'Benefit not found' });
      }

      const result = db.prepare(`
        INSERT INTO benefit_usage (user_card_id, benefit_id, amount_used, used_date, notes)
        VALUES (?, ?, ?, ?, ?)
      `).run(userCardId, benefitId, amountUsed, usedDate, notes || null);

      res.status(201).json({ id: result.lastInsertRowid });
    } catch (error) {
      console.error('Error logging benefit usage:', error);
      res.status(500).json({ error: 'Failed to log benefit usage' });
    }
  });

  // Update benefit usage
  router.put('/usage/:id', (req, res) => {
    try {
      const { userId, amountUsed, usedDate, notes } = req.body;

      if (!userId) {
        return res.status(400).json({ error: 'userId is required' });
      }

      // Verify ownership through user_cards
      const usage = db.prepare(`
        SELECT bu.id FROM benefit_usage bu
        JOIN user_cards uc ON bu.user_card_id = uc.id
        WHERE bu.id = ? AND uc.user_id = ?
      `).get(req.params.id, userId);

      if (!usage) {
        return res.status(404).json({ error: 'Usage record not found' });
      }

      db.prepare(`
        UPDATE benefit_usage 
        SET amount_used = ?, used_date = ?, notes = ?
        WHERE id = ?
      `).run(amountUsed, usedDate, notes || null, req.params.id);

      res.json({ success: true });
    } catch (error) {
      console.error('Error updating benefit usage:', error);
      res.status(500).json({ error: 'Failed to update benefit usage' });
    }
  });

  // Delete benefit usage
  router.delete('/usage/:id', (req, res) => {
    try {
      const userId = req.query.userId;

      if (!userId) {
        return res.status(400).json({ error: 'userId is required' });
      }

      // Verify ownership through user_cards
      const usage = db.prepare(`
        SELECT bu.id FROM benefit_usage bu
        JOIN user_cards uc ON bu.user_card_id = uc.id
        WHERE bu.id = ? AND uc.user_id = ?
      `).get(req.params.id, userId);

      if (!usage) {
        return res.status(404).json({ error: 'Usage record not found' });
      }

      db.prepare('DELETE FROM benefit_usage WHERE id = ?').run(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error('Error deleting benefit usage:', error);
      res.status(500).json({ error: 'Failed to delete benefit usage' });
    }
  });

  // Get usage history for a user card
  router.get('/usage/:userCardId', (req, res) => {
    try {
      const userId = req.query.userId;

      if (!userId) {
        return res.status(400).json({ error: 'userId is required' });
      }

      // Verify ownership
      const userCard = db.prepare('SELECT id FROM user_cards WHERE id = ? AND user_id = ?').get(req.params.userCardId, userId);
      if (!userCard) {
        return res.status(404).json({ error: 'User card not found' });
      }

      const usage = db.prepare(`
        SELECT 
          bu.*,
          cb.name as benefit_name,
          cb.type as benefit_type,
          cb.value as benefit_value,
          cb.max_value as benefit_max_value
        FROM benefit_usage bu
        JOIN card_benefits cb ON bu.benefit_id = cb.id
        WHERE bu.user_card_id = ?
        ORDER BY bu.used_date DESC
      `).all(req.params.userCardId);

      res.json(usage.map(u => ({
        id: u.id,
        benefitId: u.benefit_id,
        benefitName: u.benefit_name,
        benefitType: u.benefit_type,
        benefitValue: u.benefit_value,
        benefitMaxValue: u.benefit_max_value,
        amountUsed: u.amount_used,
        usedDate: u.used_date,
        notes: u.notes,
      })));
    } catch (error) {
      console.error('Error fetching benefit usage:', error);
      res.status(500).json({ error: 'Failed to fetch benefit usage' });
    }
  });

  return router;
}
