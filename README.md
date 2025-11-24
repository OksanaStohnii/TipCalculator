# Tip Calculator CLI

A simple command-line application written in TypeScript that calculates tip amounts based on user input.  
The program runs entirely in the terminal and asks the user about the bill, tip percentage, and whether the total should be split among multiple people.

## Features

- Console-based interaction
- Collects:
  - Check amount
  - Tip percentage
  - Whether to split the bill
  - Number of people (if split)
- Calculates:
  - Tip amount
  - Total bill (check + tip)
  - Amount per person (if split)
- Basic input validation (numbers, yes/no answers)
- Clear formatted output

## Example Output

--- Tip Calculation Summary ---
Check Amount: $50.00
Tip Percentage: 15%
Tip Amount: $7.50
Total Bill: $57.50
Divide among people: yes
Split between how many people: 2
Each person pays: $28.75
shell
Копировать код

## How to Run

### Install dependencies (first time only)

```bash
npm install
Build the project
bash
Копировать код
npm run build
Run compiled version
bash
Копировать код
npm start
Run directly from TypeScript (dev mode)
bash
Копировать код
npm run dev
```
