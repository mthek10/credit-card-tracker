-- American Express Platinum
INSERT INTO card_templates (name, issuer, annual_fee, image_color) VALUES 
('Platinum Card', 'American Express', 695, '#E5E4E2');

INSERT INTO card_benefits (card_template_id, name, description, type, value, max_value, category) VALUES
(1, 'Airline Fee Credit', 'Up to $200 in statement credits for incidental fees at one selected qualifying airline', 'credit', 200, 200, 'travel'),
(1, 'Uber Cash', '$200 in Uber Cash annually ($15/month + $20 in December)', 'credit', 200, 200, 'transportation'),
(1, 'Saks Fifth Avenue Credit', '$100 in statement credits at Saks ($50 Jan-Jun, $50 Jul-Dec)', 'credit', 100, 100, 'shopping'),
(1, 'Digital Entertainment Credit', '$240 annual credit for select streaming services ($20/month)', 'credit', 240, 240, 'entertainment'),
(1, 'Hotel Credit', '$200 annual credit for prepaid Fine Hotels + Resorts or The Hotel Collection bookings', 'credit', 200, 200, 'travel'),
(1, 'CLEAR Plus Credit', 'Up to $189 statement credit for CLEAR Plus membership', 'credit', 189, 189, 'travel'),
(1, 'Equinox Credit', 'Up to $300 annual statement credit for Equinox+ digital fitness', 'credit', 300, 300, 'wellness'),
(1, 'Walmart+ Credit', 'Statement credits covering Walmart+ membership ($12.95/month)', 'credit', 155, 155, 'shopping'),
(1, 'Centurion Lounge Access', 'Complimentary access to Centurion Lounges', 'perk', 500, NULL, 'travel'),
(1, '5x Points on Flights', '5x Membership Rewards points on flights booked directly with airlines or Amex Travel', 'points_multiplier', 5, NULL, 'travel');

-- American Express Gold
INSERT INTO card_templates (name, issuer, annual_fee, image_color) VALUES 
('Gold Card', 'American Express', 325, '#D4AF37');

INSERT INTO card_benefits (card_template_id, name, description, type, value, max_value, category) VALUES
(2, 'Dining Credit', '$120 annual dining credit at select restaurants ($10/month)', 'credit', 120, 120, 'dining'),
(2, 'Uber Cash', '$120 in Uber Cash annually ($10/month)', 'credit', 120, 120, 'transportation'),
(2, 'Dunkin Credit', '$84 annual Dunkin credit ($7/month)', 'credit', 84, 84, 'dining'),
(2, '4x Points on Dining', '4x Membership Rewards points at restaurants worldwide', 'points_multiplier', 4, NULL, 'dining'),
(2, '4x Points on Groceries', '4x Membership Rewards points at U.S. supermarkets (up to $25k/year)', 'points_multiplier', 4, NULL, 'groceries');

-- American Express Green
INSERT INTO card_templates (name, issuer, annual_fee, image_color) VALUES 
('Green Card', 'American Express', 150, '#228B22');

INSERT INTO card_benefits (card_template_id, name, description, type, value, max_value, category) VALUES
(3, 'LoungeBuddy Credit', '$100 annual credit for LoungeBuddy airport lounge access', 'credit', 100, 100, 'travel'),
(3, 'CLEAR Plus Credit', 'Up to $189 statement credit for CLEAR Plus membership', 'credit', 189, 189, 'travel'),
(3, '3x Points on Travel', '3x Membership Rewards points on travel including transit, flights, and hotels', 'points_multiplier', 3, NULL, 'travel'),
(3, '3x Points on Dining', '3x Membership Rewards points at restaurants worldwide', 'points_multiplier', 3, NULL, 'dining');

-- Chase Sapphire Reserve
INSERT INTO card_templates (name, issuer, annual_fee, image_color) VALUES 
('Sapphire Reserve', 'Chase', 550, '#1A365D');

INSERT INTO card_benefits (card_template_id, name, description, type, value, max_value, category) VALUES
(4, 'Travel Credit', '$300 annual travel credit automatically applied', 'credit', 300, 300, 'travel'),
(4, 'DoorDash DashPass', 'Complimentary DashPass subscription + $60 annual credit', 'credit', 60, 60, 'dining'),
(4, 'Lyft Pink', 'Complimentary Lyft Pink All Access membership', 'perk', 199, NULL, 'transportation'),
(4, 'Priority Pass Lounge', 'Unlimited Priority Pass lounge access', 'perk', 429, NULL, 'travel'),
(4, 'Global Entry/TSA PreCheck', 'Up to $100 credit for Global Entry or TSA PreCheck', 'credit', 100, 100, 'travel'),
(4, '3x Points on Travel & Dining', '3x Ultimate Rewards points on travel and dining', 'points_multiplier', 3, NULL, 'travel');

-- Chase Sapphire Preferred
INSERT INTO card_templates (name, issuer, annual_fee, image_color) VALUES 
('Sapphire Preferred', 'Chase', 95, '#2563EB');

INSERT INTO card_benefits (card_template_id, name, description, type, value, max_value, category) VALUES
(5, 'Anniversary Points', '10% anniversary point bonus on purchases', 'perk', 50, NULL, 'rewards'),
(5, '3x Points on Dining', '3x Ultimate Rewards points on dining', 'points_multiplier', 3, NULL, 'dining'),
(5, '2x Points on Travel', '2x Ultimate Rewards points on travel', 'points_multiplier', 2, NULL, 'travel'),
(5, 'Trip Cancellation Insurance', 'Trip cancellation/interruption insurance up to $10,000 per trip', 'perk', 100, NULL, 'travel');

-- Capital One Venture X
INSERT INTO card_templates (name, issuer, annual_fee, image_color) VALUES 
('Venture X', 'Capital One', 395, '#004977');

INSERT INTO card_benefits (card_template_id, name, description, type, value, max_value, category) VALUES
(6, 'Travel Credit', '$300 annual credit for Capital One Travel bookings', 'credit', 300, 300, 'travel'),
(6, 'Anniversary Miles', '10,000 bonus miles on account anniversary', 'perk', 100, NULL, 'rewards'),
(6, 'Priority Pass Lounge', 'Unlimited Priority Pass lounge access', 'perk', 429, NULL, 'travel'),
(6, 'Capital One Lounge Access', 'Access to Capital One Lounges', 'perk', 300, NULL, 'travel'),
(6, 'Global Entry/TSA PreCheck', 'Up to $100 credit for Global Entry or TSA PreCheck every 4 years', 'credit', 100, 100, 'travel'),
(6, '2x Miles on Everything', '2x miles on every purchase', 'points_multiplier', 2, NULL, 'general');

-- Capital One Venture
INSERT INTO card_templates (name, issuer, annual_fee, image_color) VALUES 
('Venture Rewards', 'Capital One', 95, '#D03027');

INSERT INTO card_benefits (card_template_id, name, description, type, value, max_value, category) VALUES
(7, 'Global Entry/TSA PreCheck', 'Up to $100 credit for Global Entry or TSA PreCheck', 'credit', 100, 100, 'travel'),
(7, '2x Miles on Everything', '2x miles on every purchase', 'points_multiplier', 2, NULL, 'general');

-- Citi Premier
INSERT INTO card_templates (name, issuer, annual_fee, image_color) VALUES 
('Premier', 'Citi', 95, '#003B70');

INSERT INTO card_benefits (card_template_id, name, description, type, value, max_value, category) VALUES
(8, '3x Points on Travel', '3x ThankYou points on air travel and hotels', 'points_multiplier', 3, NULL, 'travel'),
(8, '3x Points on Dining', '3x ThankYou points at restaurants', 'points_multiplier', 3, NULL, 'dining'),
(8, '3x Points on Groceries', '3x ThankYou points at supermarkets', 'points_multiplier', 3, NULL, 'groceries'),
(8, '3x Points on Gas', '3x ThankYou points at gas stations', 'points_multiplier', 3, NULL, 'gas'),
(8, 'No Foreign Transaction Fees', 'No foreign transaction fees on purchases', 'perk', 50, NULL, 'travel');

-- Hilton Honors Aspire
INSERT INTO card_templates (name, issuer, annual_fee, image_color) VALUES 
('Hilton Honors Aspire', 'American Express', 550, '#104C97');

INSERT INTO card_benefits (card_template_id, name, description, type, value, max_value, category) VALUES
(9, 'Hilton Resort Credit', '$400 annual Hilton resort credit', 'credit', 400, 400, 'travel'),
(9, 'Airline Fee Credit', 'Up to $250 in airline fee credits', 'credit', 250, 250, 'travel'),
(9, 'Free Night Reward', 'Annual free night reward at most Hilton properties', 'perk', 500, NULL, 'travel'),
(9, 'Diamond Status', 'Complimentary Hilton Honors Diamond status', 'perk', 400, NULL, 'travel'),
(9, 'Priority Pass Lounge', 'Unlimited Priority Pass lounge access', 'perk', 429, NULL, 'travel');

-- Marriott Bonvoy Brilliant
INSERT INTO card_templates (name, issuer, annual_fee, image_color) VALUES 
('Bonvoy Brilliant', 'American Express', 650, '#8B0000');

INSERT INTO card_benefits (card_template_id, name, description, type, value, max_value, category) VALUES
(10, 'Dining Credit', '$300 annual statement credit at restaurants worldwide', 'credit', 300, 300, 'dining'),
(10, 'Marriott Property Credit', '$100 property credit for stays of 2+ nights', 'credit', 100, 100, 'travel'),
(10, 'Free Night Award', 'Annual free night award up to 85,000 points', 'perk', 600, NULL, 'travel'),
(10, 'Platinum Elite Status', 'Complimentary Marriott Bonvoy Platinum Elite status', 'perk', 300, NULL, 'travel'),
(10, 'Priority Pass Lounge', 'Unlimited Priority Pass lounge access', 'perk', 429, NULL, 'travel');
