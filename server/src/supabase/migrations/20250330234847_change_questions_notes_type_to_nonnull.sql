-- Update existing NULL values to empty strings
UPDATE questions
SET notes = ''
WHERE notes IS NULL;

-- Alter the column to be NOT NULL
ALTER TABLE questions
ALTER COLUMN notes SET NOT NULL;
