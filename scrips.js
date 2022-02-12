let Modal = {
  open() {
    document.querySelector(".modal-overlay").classList.add("active");
  },

  close() {
    document.querySelector(".modal-overlay").classList.remove("active");
  },
};

const transactions = [
  //   {
  //   description: 'Luz',
  //   amount: -50000,
  //   date: '23/05/2021'
  // },
  // {
  //   description: 'Internet',
  //   amount: -20000,
  //   date: '23/05/2021'
  // },
  // {
  //   description: 'Novas Mobilias',
  //   amount: -15000,
  //   date: '23/05/2021'
  // },
  // {
  //   description: 'Yo Salario',
  //   amount: 150000,
  //   date: '20/05/2021'
  // },
];

const Transaction = {
  all: transactions,

  add(value) {
    Transaction.all.push(value);
  },

  remove(index) {
    Transaction.all.splice(index);
  },

  incomes() {
    let income = 0;

    transactions.forEach((transaction) => {
      if (transaction.amount > 0) {
        income += transaction.amount;
      }
    });

    return income;
  },
  expenses() {
    let expense = 0;

    transactions.forEach((transaction) => {
      if (transaction.amount < 0) {
        expense += transaction.amount;
      }
    });

    return expense;
  },

  total() {
    return Transaction.incomes() + Transaction.expenses();
  },
};

const DOM = {
  transactionContainer: document.querySelector("#data_table"),

  addTransaction(transaction, index) {
    const tr = document.createElement("tr");
    tr.innerHTML = DOM.innerHTMLTransaction(transaction);

    DOM.transactionContainer.appendChild(tr);
  },

  innerHTMLTransaction(transaction) {
    const amount = Utils.formatCurrency(transaction.amount);

    const html = `
        <td>${transaction.description}</td>
        <td>${amount}</td>
        <td>${transaction.date}</td>
      

    `;
    return html;
  },

  updateBalance() {
    document.getElementById("incomeDisplay").innerHTML = Utils.formatCurrency(
      Transaction.incomes()
    );

    document.getElementById("expenseDisplay").innerHTML = Utils.formatCurrency(
      Transaction.expenses()
    );

    document.getElementById("totalDisplay").innerHTML = Utils.formatCurrency(
      Transaction.total()
    );
  },
};

const Utils = {
  formatAmount(value) {
    value = Number(value) * 100;
    return value;
  },

  formatDate(date) {
    const splittedDate = date.split("-");
    return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`;
  },

  formatCurrency(value) {
    const signal = Number(value) < 0 ? "-" : "";

    value = String(value).replace(/\D/, "").replace(",", ".");

    value = Number(value) / 100;

    value = value.toLocaleString(`pt-BR`, {
      style: `currency`,
      currency: `BRL`,
    });

    return `${signal} ${value}`;
  },
};

const Form = {
  description: document.querySelector("input#description"),
  amount: document.querySelector("input#amount"),
  date: document.querySelector("input#date"),

  getValues() {
    return {
      description: Form.description.value,
      amount: Form.amount.value,
      date: Form.date.value,
    };
  },

  formatData() { },

  validateFields() {
    const { description, amount, date } = Form.getValues();

    if (
      description.trim() === "" ||
      amount.trim() === "" ||
      date.trim() === ""
    ) {
      throw new Error("Por favor, preencha todos os campos");
    }
  },

  formatValues() {
    let { description, amount, date } = Form.getValues();

    amount = Utils.formatAmount(amount);

    date = Utils.formatDate(date);

    return {
      description,
      amount,
      date,
    };
  },

  clearFields() {
    Form.description.value = "";
    Form.amount.value = "";
    Form.date.value = "";
  },

  submit(event) {
    event.preventDefault();

    try {
      Form.validateFields();
      const transaction = Form.formatValues();
      Transaction.add(transaction);
      DOM.addTransaction(transaction, null);
      DOM.updateBalance();
      Form.clearFields();
      Modal.close();
      // App.reload()
    } catch (error) {
      alert(error.message);
    }
  },
};

const Storage = {
  get() {
    return JSON.parse(localStorage.getItem("dev.finances:transactions")) || [];
  },

  set(transaction) {
    localStorage.setItem(
      "dev.finances:transactions",
      JSON.stringify(transaction)
    );
  },
};

DOM.updateBalance();

const App = {
  init() {
    Transaction.all.forEach(function (transaction) {
      DOM.addTransaction(transaction);
    });

    DOM.updateBalance();
  },

  reload() {
    //DOM.clearTransaction()
    App.init();
  },
};

App.init();
