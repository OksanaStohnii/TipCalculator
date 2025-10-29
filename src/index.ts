
// --- Tip Calculation Summary ---
// Check Amount: $50.00
// Tip Percentage: 15%
// Tip Amount: $7.50
// Total Bill: $57.50
// Divide among people: yes
// Split between how many people: 2
// Each person pays: $28.75
// -----------------------------


import readline from "node:readline";
import {stdin as input, stdout as output} from "node:process";

const rl = readline.createInterface({input, output});

interface TipAnswer {
  checkAmount : number;
  tipPercent: number;
  split: boolean;
  peopleCount?: number;
}

const askSplit = async(question:string): Promise<boolean> => {
  return new Promise(resolve => {
    rl.question(question, (answer) => {
      const result = answer.trim().toLowerCase();
      if (["y", "yes"].includes(result)) return resolve(true);
        if (["n", "no"].includes(result)) return resolve(false);
        console.log("Please answer yes or no (y/n).");
        return resolve(askSplit(question));
    })
  })
}


const askNum = async(question: string, role?: string): Promise<number> => {
  return new Promise(resolve => {
    rl.question(question, (answer) => {
      const result = answer.trim();

      const num = role === "people" ? validationPeople(result) : validationNum(result);

      if (num === null) {
        console.log("Please try again...");
        return resolve(askNum(question, role));
      }

      return resolve(num);
    })
  })
}

function validationPeople (result:string): number | null {
  if (!result) return null;

  let num = Number(result.replace(",", "."));
  
  if (!Number.isInteger(num) || num < 1) {
    console.log("Please enter an integer number ≥ 1.");
    return null;
  }
  return num;
}

function validationNum (result:string): number | null {
  if (!result) return null;

  let num = Number(result.replace(",", "."));
  if ((!Number.isFinite(num)) || num < 0) return null;

  return num;
}

const money = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" })
    .format(Number(n.toFixed(2)));

(async () => {
  const answers: TipAnswer = {
    checkAmount: await askNum("How high is the check? (e.g., 50.00): "),
    tipPercent: await askNum("What percentage of tip will you give? (e.g., 15 for 15%): "),
    split: await askSplit("Should the bill be split among multiple people? (yes/no): "),
  };

  if (answers.split) {
    answers.peopleCount = await askNum("How many people will split the bill?: ", "people");
  }

  const check = answers.checkAmount;
  const tipPct = answers.tipPercent;
  const tipAmount = Number((check * (tipPct / 100)).toFixed(2));
  const totalBill = Number((check + tipAmount).toFixed(2));

const lines = [
    "--- Tip Calculation Summary ---",
    `Check Amount: ${money(check)}`,
    `Tip Percentage: ${tipPct}%`,
    `Tip Amount: ${money(tipAmount)}`,
    `Total Bill: ${money(totalBill)}`,
    `Divide among people: ${answers.split ? "yes" : "no"}`,
  ];

if (answers.split && answers.peopleCount) {
    const each = Number((totalBill / answers.peopleCount).toFixed(2));
    lines.push(
      `Split between how many people: ${answers.peopleCount}`,
      `Each person pays: ${money(each)}`
    );
  }
lines.push("-----------------------------");
console.log(lines.join("\n"));

  rl.close();
})();

