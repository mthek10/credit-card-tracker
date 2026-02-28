-- =====================================================
-- AMERICAN EXPRESS CARDS
-- =====================================================

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

-- American Express Blue Business Plus
INSERT INTO card_templates (name, issuer, annual_fee, image_color) VALUES 
('Blue Business Plus', 'American Express', 0, '#2563EB');

INSERT INTO card_benefits (card_template_id, name, description, type, value, max_value, category) VALUES
(4, '2x Points on Everything', '2x Membership Rewards points on first $50k in purchases per year', 'points_multiplier', 2, NULL, 'general'),
(4, 'No Annual Fee', 'No annual fee for this business card', 'perk', 0, NULL, 'general');

-- Delta SkyMiles Reserve
INSERT INTO card_templates (name, issuer, annual_fee, image_color) VALUES 
('Delta SkyMiles Reserve', 'American Express', 650, '#1a1a2e');

INSERT INTO card_benefits (card_template_id, name, description, type, value, max_value, category) VALUES
(5, 'Delta Sky Club Access', 'Complimentary Delta Sky Club access when flying Delta', 'perk', 600, NULL, 'travel'),
(5, 'Companion Certificate', 'Annual Companion Certificate for domestic first class', 'perk', 500, NULL, 'travel'),
(5, 'Global Entry/TSA PreCheck', 'Up to $100 credit for Global Entry or TSA PreCheck', 'credit', 100, 100, 'travel'),
(5, 'MQD Waiver', 'MQD requirement waived after $25k spend', 'perk', 200, NULL, 'travel'),
(5, '3x Miles on Delta', '3x miles on Delta purchases', 'points_multiplier', 3, NULL, 'travel');

-- Delta SkyMiles Platinum
INSERT INTO card_templates (name, issuer, annual_fee, image_color) VALUES 
('Delta SkyMiles Platinum', 'American Express', 350, '#4A4A6A');

INSERT INTO card_benefits (card_template_id, name, description, type, value, max_value, category) VALUES
(6, 'Companion Certificate', 'Annual Companion Certificate for domestic main cabin', 'perk', 300, NULL, 'travel'),
(6, 'Global Entry/TSA PreCheck', 'Up to $100 credit for Global Entry or TSA PreCheck', 'credit', 100, 100, 'travel'),
(6, 'First Bag Free', 'First checked bag free on Delta flights', 'perk', 120, NULL, 'travel'),
(6, '3x Miles on Delta', '3x miles on Delta purchases', 'points_multiplier', 3, NULL, 'travel'),
(6, '3x Miles on Hotels', '3x miles on hotels booked through Delta', 'points_multiplier', 3, NULL, 'travel');

-- Delta SkyMiles Gold
INSERT INTO card_templates (name, issuer, annual_fee, image_color) VALUES 
('Delta SkyMiles Gold', 'American Express', 150, '#D4AF37');

INSERT INTO card_benefits (card_template_id, name, description, type, value, max_value, category) VALUES
(7, 'First Bag Free', 'First checked bag free on Delta flights', 'perk', 120, NULL, 'travel'),
(7, 'Priority Boarding', 'Main Cabin 1 priority boarding', 'perk', 50, NULL, 'travel'),
(7, '2x Miles on Delta', '2x miles on Delta purchases', 'points_multiplier', 2, NULL, 'travel'),
(7, '2x Miles on Dining', '2x miles at restaurants', 'points_multiplier', 2, NULL, 'dining'),
(7, '2x Miles on Groceries', '2x miles at U.S. supermarkets', 'points_multiplier', 2, NULL, 'groceries');

-- Hilton Honors Aspire
INSERT INTO card_templates (name, issuer, annual_fee, image_color) VALUES 
('Hilton Honors Aspire', 'American Express', 550, '#104C97');

INSERT INTO card_benefits (card_template_id, name, description, type, value, max_value, category) VALUES
(8, 'Hilton Resort Credit', '$400 annual Hilton resort credit', 'credit', 400, 400, 'travel'),
(8, 'Airline Fee Credit', 'Up to $250 in airline fee credits', 'credit', 250, 250, 'travel'),
(8, 'Free Night Reward', 'Annual free night reward at most Hilton properties', 'perk', 500, NULL, 'travel'),
(8, 'Diamond Status', 'Complimentary Hilton Honors Diamond status', 'perk', 400, NULL, 'travel'),
(8, 'Priority Pass Lounge', 'Unlimited Priority Pass lounge access', 'perk', 429, NULL, 'travel');

-- Hilton Honors Surpass
INSERT INTO card_templates (name, issuer, annual_fee, image_color) VALUES 
('Hilton Honors Surpass', 'American Express', 150, '#4A6B6B');

INSERT INTO card_benefits (card_template_id, name, description, type, value, max_value, category) VALUES
(9, 'Free Night Reward', 'Annual free night reward after $15k spend', 'perk', 300, NULL, 'travel'),
(9, 'Gold Status', 'Complimentary Hilton Honors Gold status', 'perk', 200, NULL, 'travel'),
(9, '12x Points on Hilton', '12x Hilton Honors points at Hilton properties', 'points_multiplier', 12, NULL, 'travel'),
(9, '6x Points on Dining', '6x Hilton Honors points at restaurants', 'points_multiplier', 6, NULL, 'dining'),
(9, '6x Points on Groceries', '6x Hilton Honors points at U.S. supermarkets', 'points_multiplier', 6, NULL, 'groceries');

-- Marriott Bonvoy Brilliant
INSERT INTO card_templates (name, issuer, annual_fee, image_color) VALUES 
('Bonvoy Brilliant', 'American Express', 650, '#8B0000');

INSERT INTO card_benefits (card_template_id, name, description, type, value, max_value, category) VALUES
(10, 'Dining Credit', '$300 annual statement credit at restaurants worldwide', 'credit', 300, 300, 'dining'),
(10, 'Marriott Property Credit', '$100 property credit for stays of 2+ nights', 'credit', 100, 100, 'travel'),
(10, 'Free Night Award', 'Annual free night award up to 85,000 points', 'perk', 600, NULL, 'travel'),
(10, 'Platinum Elite Status', 'Complimentary Marriott Bonvoy Platinum Elite status', 'perk', 300, NULL, 'travel'),
(10, 'Priority Pass Lounge', 'Unlimited Priority Pass lounge access', 'perk', 429, NULL, 'travel');

-- Marriott Bonvoy Bevy
INSERT INTO card_templates (name, issuer, annual_fee, image_color) VALUES 
('Bonvoy Bevy', 'American Express', 250, '#5D3A2E');

INSERT INTO card_benefits (card_template_id, name, description, type, value, max_value, category) VALUES
(11, 'Free Night Award', 'Annual free night award up to 50,000 points', 'perk', 350, NULL, 'travel'),
(11, 'Gold Elite Status', 'Complimentary Marriott Bonvoy Gold Elite status', 'perk', 150, NULL, 'travel'),
(11, '6x Points on Marriott', '6x Marriott Bonvoy points at Marriott properties', 'points_multiplier', 6, NULL, 'travel'),
(11, '4x Points on Dining', '4x Marriott Bonvoy points at restaurants', 'points_multiplier', 4, NULL, 'dining');

-- =====================================================
-- CHASE CARDS
-- =====================================================

-- Chase Sapphire Reserve
INSERT INTO card_templates (name, issuer, annual_fee, image_color) VALUES 
('Sapphire Reserve', 'Chase', 550, '#1A365D');

INSERT INTO card_benefits (card_template_id, name, description, type, value, max_value, category) VALUES
(12, 'Travel Credit', '$300 annual travel credit automatically applied', 'credit', 300, 300, 'travel'),
(12, 'DoorDash DashPass', 'Complimentary DashPass subscription + $60 annual credit', 'credit', 60, 60, 'dining'),
(12, 'Lyft Pink', 'Complimentary Lyft Pink All Access membership', 'perk', 199, NULL, 'transportation'),
(12, 'Priority Pass Lounge', 'Unlimited Priority Pass lounge access', 'perk', 429, NULL, 'travel'),
(12, 'Global Entry/TSA PreCheck', 'Up to $100 credit for Global Entry or TSA PreCheck', 'credit', 100, 100, 'travel'),
(12, '3x Points on Travel & Dining', '3x Ultimate Rewards points on travel and dining', 'points_multiplier', 3, NULL, 'travel');

-- Chase Sapphire Preferred
INSERT INTO card_templates (name, issuer, annual_fee, image_color) VALUES 
('Sapphire Preferred', 'Chase', 95, '#2563EB');

INSERT INTO card_benefits (card_template_id, name, description, type, value, max_value, category) VALUES
(13, 'Anniversary Points', '10% anniversary point bonus on purchases', 'perk', 50, NULL, 'rewards'),
(13, '3x Points on Dining', '3x Ultimate Rewards points on dining', 'points_multiplier', 3, NULL, 'dining'),
(13, '2x Points on Travel', '2x Ultimate Rewards points on travel', 'points_multiplier', 2, NULL, 'travel'),
(13, 'Trip Cancellation Insurance', 'Trip cancellation/interruption insurance up to $10,000 per trip', 'perk', 100, NULL, 'travel');

-- Chase Freedom Unlimited
INSERT INTO card_templates (name, issuer, annual_fee, image_color) VALUES 
('Freedom Unlimited', 'Chase', 0, '#0EA5E9');

INSERT INTO card_benefits (card_template_id, name, description, type, value, max_value, category) VALUES
(14, '1.5% Cash Back', '1.5% cash back on all purchases', 'points_multiplier', 1.5, NULL, 'general'),
(14, '3% on Dining', '3% cash back on dining', 'points_multiplier', 3, NULL, 'dining'),
(14, '3% on Drugstores', '3% cash back at drugstores', 'points_multiplier', 3, NULL, 'shopping'),
(14, 'No Annual Fee', 'No annual fee', 'perk', 0, NULL, 'general');

-- Chase Freedom Flex
INSERT INTO card_templates (name, issuer, annual_fee, image_color) VALUES 
('Freedom Flex', 'Chase', 0, '#06B6D4');

INSERT INTO card_benefits (card_template_id, name, description, type, value, max_value, category) VALUES
(15, '5% Rotating Categories', '5% cash back on rotating quarterly categories (up to $1,500/quarter)', 'points_multiplier', 5, NULL, 'general'),
(15, '3% on Dining', '3% cash back on dining', 'points_multiplier', 3, NULL, 'dining'),
(15, '3% on Drugstores', '3% cash back at drugstores', 'points_multiplier', 3, NULL, 'shopping'),
(15, 'No Annual Fee', 'No annual fee', 'perk', 0, NULL, 'general');

-- Chase Ink Business Preferred
INSERT INTO card_templates (name, issuer, annual_fee, image_color) VALUES 
('Ink Business Preferred', 'Chase', 95, '#1E1E1E');

INSERT INTO card_benefits (card_template_id, name, description, type, value, max_value, category) VALUES
(16, '3x Points on Travel', '3x Ultimate Rewards points on travel', 'points_multiplier', 3, NULL, 'travel'),
(16, '3x Points on Shipping', '3x Ultimate Rewards points on shipping purchases', 'points_multiplier', 3, NULL, 'business'),
(16, '3x Points on Internet/Phone', '3x Ultimate Rewards points on internet, cable, and phone services', 'points_multiplier', 3, NULL, 'business'),
(16, '3x Points on Advertising', '3x Ultimate Rewards points on advertising purchases', 'points_multiplier', 3, NULL, 'business'),
(16, 'Cell Phone Protection', 'Up to $1,000 cell phone protection', 'perk', 100, NULL, 'insurance');

-- Chase Ink Business Unlimited
INSERT INTO card_templates (name, issuer, annual_fee, image_color) VALUES 
('Ink Business Unlimited', 'Chase', 0, '#4B5563');

INSERT INTO card_benefits (card_template_id, name, description, type, value, max_value, category) VALUES
(17, '1.5% Cash Back', '1.5% cash back on all business purchases', 'points_multiplier', 1.5, NULL, 'general'),
(17, 'No Annual Fee', 'No annual fee', 'perk', 0, NULL, 'general');

-- Chase United Club Infinite
INSERT INTO card_templates (name, issuer, annual_fee, image_color) VALUES 
('United Club Infinite', 'Chase', 525, '#0C2340');

INSERT INTO card_benefits (card_template_id, name, description, type, value, max_value, category) VALUES
(18, 'United Club Access', 'Complimentary United Club membership', 'perk', 650, NULL, 'travel'),
(18, 'Global Entry/TSA PreCheck', 'Up to $100 credit for Global Entry or TSA PreCheck', 'credit', 100, 100, 'travel'),
(18, 'Free Checked Bags', 'First and second checked bags free on United', 'perk', 280, NULL, 'travel'),
(18, '4x Miles on United', '4x miles on United purchases', 'points_multiplier', 4, NULL, 'travel'),
(18, '2x Miles on Dining & Travel', '2x miles on dining and travel', 'points_multiplier', 2, NULL, 'travel');

-- Chase United Quest
INSERT INTO card_templates (name, issuer, annual_fee, image_color) VALUES 
('United Quest', 'Chase', 250, '#6B238E');

INSERT INTO card_benefits (card_template_id, name, description, type, value, max_value, category) VALUES
(19, 'United Travel Credit', '$125 annual United travel credit', 'credit', 125, 125, 'travel'),
(19, 'Anniversary Miles', '10,000 bonus miles on account anniversary', 'perk', 100, NULL, 'rewards'),
(19, 'Free Checked Bags', 'First and second checked bags free on United', 'perk', 280, NULL, 'travel'),
(19, '3x Miles on United', '3x miles on United purchases', 'points_multiplier', 3, NULL, 'travel'),
(19, '2x Miles on Dining & Hotels', '2x miles on dining and hotel stays', 'points_multiplier', 2, NULL, 'travel');

-- Chase Southwest Rapid Rewards Priority
INSERT INTO card_templates (name, issuer, annual_fee, image_color) VALUES 
('Southwest Rapid Rewards Priority', 'Chase', 149, '#2D5A87');

INSERT INTO card_benefits (card_template_id, name, description, type, value, max_value, category) VALUES
(20, 'Southwest Credit', '$75 annual Southwest travel credit', 'credit', 75, 75, 'travel'),
(20, 'Anniversary Points', '7,500 anniversary points', 'perk', 112, NULL, 'rewards'),
(20, 'Upgraded Boardings', '4 upgraded boardings per year', 'perk', 100, NULL, 'travel'),
(20, '3x Points on Southwest', '3x points on Southwest purchases', 'points_multiplier', 3, NULL, 'travel'),
(20, '2x Points on Hotels & Car Rentals', '2x points on Rapid Rewards hotel and car rental partners', 'points_multiplier', 2, NULL, 'travel');

-- Chase World of Hyatt
INSERT INTO card_templates (name, issuer, annual_fee, image_color) VALUES 
('World of Hyatt', 'Chase', 95, '#333333');

INSERT INTO card_benefits (card_template_id, name, description, type, value, max_value, category) VALUES
(21, 'Free Night Award', 'Annual free night at Category 1-4 Hyatt', 'perk', 200, NULL, 'travel'),
(21, 'Discoverist Status', 'Automatic Hyatt Discoverist status', 'perk', 100, NULL, 'travel'),
(21, '4x Points on Hyatt', '4x points at Hyatt hotels', 'points_multiplier', 4, NULL, 'travel'),
(21, '2x Points on Dining', '2x points on dining', 'points_multiplier', 2, NULL, 'dining'),
(21, '2x Points on Fitness', '2x points on gym memberships and fitness clubs', 'points_multiplier', 2, NULL, 'wellness');

-- Chase IHG One Rewards Premier
INSERT INTO card_templates (name, issuer, annual_fee, image_color) VALUES 
('IHG One Rewards Premier', 'Chase', 99, '#2D5A87');

INSERT INTO card_benefits (card_template_id, name, description, type, value, max_value, category) VALUES
(22, 'Free Night Award', 'Annual free night at any IHG property', 'perk', 250, NULL, 'travel'),
(22, 'Platinum Elite Status', 'Complimentary IHG Platinum Elite status', 'perk', 150, NULL, 'travel'),
(22, '4th Night Free', '4th night free on reward stays', 'perk', 100, NULL, 'travel'),
(22, '10x Points on IHG', '10x points at IHG properties', 'points_multiplier', 10, NULL, 'travel'),
(22, '2x Points on Dining & Gas', '2x points on dining and gas', 'points_multiplier', 2, NULL, 'general');

-- =====================================================
-- CAPITAL ONE CARDS
-- =====================================================

-- Capital One Venture X
INSERT INTO card_templates (name, issuer, annual_fee, image_color) VALUES 
('Venture X', 'Capital One', 395, '#004977');

INSERT INTO card_benefits (card_template_id, name, description, type, value, max_value, category) VALUES
(23, 'Travel Credit', '$300 annual credit for Capital One Travel bookings', 'credit', 300, 300, 'travel'),
(23, 'Anniversary Miles', '10,000 bonus miles on account anniversary', 'perk', 100, NULL, 'rewards'),
(23, 'Priority Pass Lounge', 'Unlimited Priority Pass lounge access', 'perk', 429, NULL, 'travel'),
(23, 'Capital One Lounge Access', 'Access to Capital One Lounges', 'perk', 300, NULL, 'travel'),
(23, 'Global Entry/TSA PreCheck', 'Up to $100 credit for Global Entry or TSA PreCheck every 4 years', 'credit', 100, 100, 'travel'),
(23, '2x Miles on Everything', '2x miles on every purchase', 'points_multiplier', 2, NULL, 'general');

-- Capital One Venture Rewards
INSERT INTO card_templates (name, issuer, annual_fee, image_color) VALUES 
('Venture Rewards', 'Capital One', 95, '#D03027');

INSERT INTO card_benefits (card_template_id, name, description, type, value, max_value, category) VALUES
(24, 'Global Entry/TSA PreCheck', 'Up to $100 credit for Global Entry or TSA PreCheck', 'credit', 100, 100, 'travel'),
(24, '2x Miles on Everything', '2x miles on every purchase', 'points_multiplier', 2, NULL, 'general');

-- Capital One Savor Rewards
INSERT INTO card_templates (name, issuer, annual_fee, image_color) VALUES 
('Savor Rewards', 'Capital One', 95, '#1E1E1E');

INSERT INTO card_benefits (card_template_id, name, description, type, value, max_value, category) VALUES
(25, '4% on Dining', '4% cash back on dining', 'points_multiplier', 4, NULL, 'dining'),
(25, '4% on Entertainment', '4% cash back on entertainment', 'points_multiplier', 4, NULL, 'entertainment'),
(25, '3% on Groceries', '3% cash back at grocery stores', 'points_multiplier', 3, NULL, 'groceries'),
(25, '3% on Streaming', '3% cash back on streaming services', 'points_multiplier', 3, NULL, 'entertainment');

-- Capital One Quicksilver
INSERT INTO card_templates (name, issuer, annual_fee, image_color) VALUES 
('Quicksilver', 'Capital One', 0, '#4B5563');

INSERT INTO card_benefits (card_template_id, name, description, type, value, max_value, category) VALUES
(26, '1.5% Cash Back', '1.5% cash back on all purchases', 'points_multiplier', 1.5, NULL, 'general'),
(26, 'No Annual Fee', 'No annual fee', 'perk', 0, NULL, 'general'),
(26, 'No Foreign Transaction Fees', 'No foreign transaction fees', 'perk', 50, NULL, 'travel');

-- =====================================================
-- CITI CARDS
-- =====================================================

-- Citi Premier
INSERT INTO card_templates (name, issuer, annual_fee, image_color) VALUES 
('Premier', 'Citi', 95, '#003B70');

INSERT INTO card_benefits (card_template_id, name, description, type, value, max_value, category) VALUES
(27, '3x Points on Travel', '3x ThankYou points on air travel and hotels', 'points_multiplier', 3, NULL, 'travel'),
(27, '3x Points on Dining', '3x ThankYou points at restaurants', 'points_multiplier', 3, NULL, 'dining'),
(27, '3x Points on Groceries', '3x ThankYou points at supermarkets', 'points_multiplier', 3, NULL, 'groceries'),
(27, '3x Points on Gas', '3x ThankYou points at gas stations', 'points_multiplier', 3, NULL, 'gas'),
(27, 'No Foreign Transaction Fees', 'No foreign transaction fees on purchases', 'perk', 50, NULL, 'travel');

-- Citi Strata Premier
INSERT INTO card_templates (name, issuer, annual_fee, image_color) VALUES 
('Strata Premier', 'Citi', 95, '#7F1D1D');

INSERT INTO card_benefits (card_template_id, name, description, type, value, max_value, category) VALUES
(28, '3x Points on Travel', '3x ThankYou points on travel', 'points_multiplier', 3, NULL, 'travel'),
(28, '3x Points on Dining', '3x ThankYou points at restaurants', 'points_multiplier', 3, NULL, 'dining'),
(28, '3x Points on Groceries', '3x ThankYou points at supermarkets', 'points_multiplier', 3, NULL, 'groceries'),
(28, 'Annual Hotel Savings', '$100 annual hotel savings benefit', 'credit', 100, 100, 'travel');

-- Citi Custom Cash
INSERT INTO card_templates (name, issuer, annual_fee, image_color) VALUES 
('Custom Cash', 'Citi', 0, '#10B981');

INSERT INTO card_benefits (card_template_id, name, description, type, value, max_value, category) VALUES
(29, '5% Top Category', '5% cash back on your top eligible spend category each billing cycle (up to $500)', 'points_multiplier', 5, NULL, 'general'),
(29, '1% on Everything Else', '1% cash back on all other purchases', 'points_multiplier', 1, NULL, 'general'),
(29, 'No Annual Fee', 'No annual fee', 'perk', 0, NULL, 'general');

-- Citi Double Cash
INSERT INTO card_templates (name, issuer, annual_fee, image_color) VALUES 
('Double Cash', 'Citi', 0, '#2D5A87');

INSERT INTO card_benefits (card_template_id, name, description, type, value, max_value, category) VALUES
(30, '2% Cash Back', '1% when you buy + 1% when you pay = 2% total cash back', 'points_multiplier', 2, NULL, 'general'),
(30, 'No Annual Fee', 'No annual fee', 'perk', 0, NULL, 'general');

-- Citi AAdvantage Executive World Elite
INSERT INTO card_templates (name, issuer, annual_fee, image_color) VALUES 
('AAdvantage Executive World Elite', 'Citi', 595, '#2D2D2D');

INSERT INTO card_benefits (card_template_id, name, description, type, value, max_value, category) VALUES
(31, 'Admirals Club Access', 'Complimentary Admirals Club membership', 'perk', 650, NULL, 'travel'),
(31, 'Global Entry/TSA PreCheck', 'Up to $100 credit for Global Entry or TSA PreCheck', 'credit', 100, 100, 'travel'),
(31, 'Free Checked Bags', 'First checked bag free on American Airlines', 'perk', 140, NULL, 'travel'),
(31, 'Priority Boarding', 'Preferred boarding on American Airlines', 'perk', 50, NULL, 'travel'),
(31, '2x Miles on AA', '2x miles on American Airlines purchases', 'points_multiplier', 2, NULL, 'travel');

-- =====================================================
-- DISCOVER CARDS
-- =====================================================

-- Discover it Cash Back
INSERT INTO card_templates (name, issuer, annual_fee, image_color) VALUES 
('Discover it', 'Discover', 0, '#F97316');

INSERT INTO card_benefits (card_template_id, name, description, type, value, max_value, category) VALUES
(32, '5% Rotating Categories', '5% cash back on rotating quarterly categories (up to $1,500/quarter)', 'points_multiplier', 5, NULL, 'general'),
(32, '1% on Everything Else', '1% cash back on all other purchases', 'points_multiplier', 1, NULL, 'general'),
(32, 'Cashback Match', 'Discover matches all cash back earned in first year', 'perk', 200, NULL, 'rewards'),
(32, 'No Annual Fee', 'No annual fee', 'perk', 0, NULL, 'general');

-- Discover it Miles
INSERT INTO card_templates (name, issuer, annual_fee, image_color) VALUES 
('Discover it Miles', 'Discover', 0, '#10B981');

INSERT INTO card_benefits (card_template_id, name, description, type, value, max_value, category) VALUES
(33, '1.5x Miles', '1.5x miles on every purchase', 'points_multiplier', 1.5, NULL, 'general'),
(33, 'Miles Match', 'Discover matches all miles earned in first year', 'perk', 200, NULL, 'rewards'),
(33, 'No Annual Fee', 'No annual fee', 'perk', 0, NULL, 'general');

-- =====================================================
-- US BANK CARDS
-- =====================================================

-- US Bank Altitude Reserve
INSERT INTO card_templates (name, issuer, annual_fee, image_color) VALUES 
('Altitude Reserve', 'US Bank', 400, '#1E1E1E');

INSERT INTO card_benefits (card_template_id, name, description, type, value, max_value, category) VALUES
(34, 'Travel Credit', '$325 annual travel credit', 'credit', 325, 325, 'travel'),
(34, 'Priority Pass Lounge', 'Unlimited Priority Pass lounge access', 'perk', 429, NULL, 'travel'),
(34, 'Global Entry/TSA PreCheck', 'Up to $100 credit for Global Entry or TSA PreCheck', 'credit', 100, 100, 'travel'),
(34, '3x Points on Travel & Mobile', '3x points on travel and mobile wallet purchases', 'points_multiplier', 3, NULL, 'travel');

-- US Bank Altitude Connect
INSERT INTO card_templates (name, issuer, annual_fee, image_color) VALUES 
('Altitude Connect', 'US Bank', 95, '#2D5A87');

INSERT INTO card_benefits (card_template_id, name, description, type, value, max_value, category) VALUES
(35, 'Streaming Credit', '$30 annual streaming credit', 'credit', 30, 30, 'entertainment'),
(35, '4x Points on Travel & Gas', '4x points on travel and gas station purchases', 'points_multiplier', 4, NULL, 'travel'),
(35, '2x Points on Dining & Streaming', '2x points on dining and streaming', 'points_multiplier', 2, NULL, 'dining');

-- =====================================================
-- WELLS FARGO CARDS
-- =====================================================

-- Wells Fargo Autograph
INSERT INTO card_templates (name, issuer, annual_fee, image_color) VALUES 
('Autograph', 'Wells Fargo', 0, '#991B1B');

INSERT INTO card_benefits (card_template_id, name, description, type, value, max_value, category) VALUES
(36, '3x Points on Dining', '3x points on restaurants', 'points_multiplier', 3, NULL, 'dining'),
(36, '3x Points on Travel', '3x points on travel', 'points_multiplier', 3, NULL, 'travel'),
(36, '3x Points on Gas', '3x points on gas stations', 'points_multiplier', 3, NULL, 'gas'),
(36, '3x Points on Transit', '3x points on transit', 'points_multiplier', 3, NULL, 'transportation'),
(36, '3x Points on Streaming', '3x points on popular streaming services', 'points_multiplier', 3, NULL, 'entertainment'),
(36, 'No Annual Fee', 'No annual fee', 'perk', 0, NULL, 'general');

-- Wells Fargo Active Cash
INSERT INTO card_templates (name, issuer, annual_fee, image_color) VALUES 
('Active Cash', 'Wells Fargo', 0, '#B91C1C');

INSERT INTO card_benefits (card_template_id, name, description, type, value, max_value, category) VALUES
(37, '2% Cash Back', '2% cash back on all purchases', 'points_multiplier', 2, NULL, 'general'),
(37, 'No Annual Fee', 'No annual fee', 'perk', 0, NULL, 'general'),
(37, 'Cell Phone Protection', 'Up to $600 cell phone protection', 'perk', 60, NULL, 'insurance');

-- =====================================================
-- BANK OF AMERICA CARDS
-- =====================================================

-- Bank of America Premium Rewards
INSERT INTO card_templates (name, issuer, annual_fee, image_color) VALUES 
('Premium Rewards', 'Bank of America', 95, '#991B1B');

INSERT INTO card_benefits (card_template_id, name, description, type, value, max_value, category) VALUES
(38, 'Airline Incidental Credit', '$100 annual airline incidental credit', 'credit', 100, 100, 'travel'),
(38, 'Global Entry/TSA PreCheck', 'Up to $100 credit for Global Entry or TSA PreCheck', 'credit', 100, 100, 'travel'),
(38, '2x Points on Travel & Dining', '2x points on travel and dining', 'points_multiplier', 2, NULL, 'travel'),
(38, '1.5x Points on Everything', '1.5x points on all other purchases', 'points_multiplier', 1.5, NULL, 'general');

-- Bank of America Premium Rewards Elite
INSERT INTO card_templates (name, issuer, annual_fee, image_color) VALUES 
('Premium Rewards Elite', 'Bank of America', 550, '#1E1E1E');

INSERT INTO card_benefits (card_template_id, name, description, type, value, max_value, category) VALUES
(39, 'Lifestyle Credit', '$300 annual lifestyle credit (airlines, dining, or fitness)', 'credit', 300, 300, 'general'),
(39, 'Global Entry/TSA PreCheck', 'Up to $100 credit for Global Entry or TSA PreCheck', 'credit', 100, 100, 'travel'),
(39, 'Priority Pass Lounge', 'Unlimited Priority Pass lounge access', 'perk', 429, NULL, 'travel'),
(39, '2x Points on Travel & Dining', '2x points on travel and dining', 'points_multiplier', 2, NULL, 'travel');

-- Bank of America Unlimited Cash Rewards
INSERT INTO card_templates (name, issuer, annual_fee, image_color) VALUES 
('Unlimited Cash Rewards', 'Bank of America', 0, '#2D5A87');

INSERT INTO card_benefits (card_template_id, name, description, type, value, max_value, category) VALUES
(40, '1.5% Cash Back', '1.5% cash back on all purchases', 'points_multiplier', 1.5, NULL, 'general'),
(40, 'Preferred Rewards Boost', 'Up to 75% bonus with Preferred Rewards', 'perk', 100, NULL, 'rewards'),
(40, 'No Annual Fee', 'No annual fee', 'perk', 0, NULL, 'general');

-- =====================================================
-- BILT CARD
-- =====================================================

-- Bilt Mastercard
INSERT INTO card_templates (name, issuer, annual_fee, image_color) VALUES 
('Bilt Mastercard', 'Bilt', 0, '#1E1E1E');

INSERT INTO card_benefits (card_template_id, name, description, type, value, max_value, category) VALUES
(41, '1x Points on Rent', 'Earn points on rent payments with no fees', 'points_multiplier', 1, NULL, 'rent'),
(41, '3x Points on Dining', '3x points on dining', 'points_multiplier', 3, NULL, 'dining'),
(41, '2x Points on Travel', '2x points on travel', 'points_multiplier', 2, NULL, 'travel'),
(41, 'Transfer Partners', 'Transfer to major airline and hotel partners', 'perk', 100, NULL, 'rewards'),
(41, 'No Annual Fee', 'No annual fee', 'perk', 0, NULL, 'general');
