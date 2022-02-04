let Modal = {
  open(){
    document.querySelector('.modal-overlay')
    .classList
    .add('active');
    console.log('open')	
  },

  close(){
    document.querySelector('.modal-overlay')
    .classList
    .remove('active')	
  }
}

const transactions = [
  {
  id: 1,
  description: 'Luz',
  amount: -50000,
  date: '23/05/2021'
},
{
  id: 2,
  description: 'Internet',
  amount: -20000,
  date: '23/05/2021'
},
{
  id: 3,
  description: 'Novas Mobilias',
  amount: -15000,
  date: '23/05/2021'
}
]

const Transaction = {
  incomes(){
    //Somar todas as entradas
  },
  expenses(){
    //Somar todas as saidas
  },
  total(){
    //entradas menos saidas
  }

}



const DOM = {

  transactionContainer: document.querySelector('#data_table'),

  addTransaction(transaction, index){
    const tr = document.createElement('tr')
    tr.innerHTML = DOM.innerHTMLTransaction(transaction)

    DOM.transactionContainer.appendChild(tr)
  },

  innerHTMLTransaction(transaction) {

    const amount = Utils.formatCurrency(transaction.amount)

    const html =
    `
        <td>${transaction.description}</td>
        <td>${amount}</td>
        <td>${transaction.date}</td>
      

    `  
    return html
  }
}



const Utils = {
  formatCurrency(value){
    const signal = Number(value) < 0 ? `-`: ``;


    value = String(value).replace(/\D/, '')

    value = Number(value)/100;


    value = value.toLocaleString(`pt-BR` ,{
      style: `currency`,
      currency: `BRL`
    });

    return `${signal} ${value}`;



  }
}

transactions.forEach(function(transaction){
  DOM.addTransaction(transaction)
})
