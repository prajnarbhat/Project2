// I wish you good luck and happy coding 🥰🤠🥳🥳💯💯

function getFormattedTime(){

  //const now=new Date();

  //here we get as 12/29.....
  const now=new Date().toLocaleString('en-us',{
    //default option for month 2 digit numberic
      month:'short',
      //day format is numberic
      day:'numeric',
      //hour is 2 digit and min is alos 2 digit
      hour:'2-digit', 
      minute:'2-digit',
  });

  //here we get as Dec 29,11:43pm
  //Dec that is month in short,day in numeric,
  //but we need 29 Dec ...
  //here we are spling date with comma
  const date=now.split(`,`)[0].split(' ');
  //we need to get the time format
  const time=now.split(`,`)[1]
  //we get ['Dec','30']
  //but here we need first date then the month soo
  return `${date[1]} ${date[0]},${time}`
  
  }
document.querySelector('#ewallet-form').addEventListener('submit',function(e){
   //we need to prevent the event of reload page
   e.preventDefault();
   //WE NEED TO GET THE DESCRIPTION DATA
    //we need to get +- value,desc and value
    //we have select class add_type,add_desc,add_valuee
    const type=document.querySelector('.add__type').value;
    const desc=document.querySelector('.add__description').value;
    const value=document.querySelector('.add__value').value;

    //when I put no data in the form also that form will be submitted

    if(desc.length>0 && value.length>0){
        addItems(type,desc,value);
        resetForm();
    }

})
showItems();
function showItems(){
  //we get all array of data
  let items=getItemfromLS();
  //now we need to get data in UI
  const collection=document.querySelector('.collection');
  for(let item of items){
    const newHtml=`
       <div class="item">
          <div class="item-description-time">
            <div class="item-description">
              <p>${item.desc}</p>
            </div>
            <div class="item-time">
              <p>${item.time}</p>
            </div>
          </div>
          <div class="item-amount ${item.type === '+' ? 'income-amount' : 'expense-amount'}">
            <p>${item.type}$${item.value}</p>
          </div>
        </div>
        `;

        //IN CONSOLE WE GET THE ABOVE DETAILS BUT WE NEE TO APPEDN OR NEED TO DISPLAY THESE THINGS INSIDE Tthe below container
        collection.insertAdjacentHTML('afterbegin',newHtml)
  }
    
}

function addItems(type,desc,value){

    const time=getFormattedTime();

     const newHtml=`
    <div class="item">
      <div class="item-description-time">
        <div class="item-description">
          <p>${desc}</p>
        </div>
        <div class="item-time">
          <p>${time}</p>
        </div>
      </div>
      <div class="item-amount ${type === '+' ? 'income-amount' : 'expense-amount'}">
        <p>${type}$${value}</p>
      </div>
    </div> `
    console.log(newHtml)
    const collection=document.querySelector('.collection');
    collection.insertAdjacentHTML('afterbegin',newHtml)
    addItemToLS(type,desc,value,time);

    //after refreshing only we are getting or getting updated data
    //so we need to get the total expense and total income before refreshing

    showTotalExpense();
    showTotalIncome();
    showTotalBalance();
  
    

}

function resetForm(){
    //need to reset +-,desc,value
    //after submit the values need to be reset
    document.querySelector('.add__type').value='+';
    document.querySelector('.add__description').value='';
    document.querySelector('.add__value').value='';


};
function getItemfromLS(){
  let items=localStorage.getItem('items');
  //we get the data in json 
  // we neeed to convert all object data
  if(items){
   items=JSON.parse(items)

  }else{
   items=[];
  }
  return items;

}

function addItemToLS(type,desc,value,time){

    let items=getItemfromLS();
    
     //adding all the array data to items
     items.push({desc,time,type,value,
     })
     //need to add our array to our localstorage
     //we need to use set Item 
     //again we need to convert array data in the json data
     localStorage.setItem('items',JSON.stringify(items));
}

showTotalIncome();

function showTotalIncome(){
  let items=getItemfromLS();
  //First get all data from LocalStorage
  //so now we need to add all data in +
  //we want to get all item from itrems
  let totalIncome=0;
  for(let item of items){
    if(item.type === '+'){
      totalIncome += parseInt(item.value);
    }
  }
  console.log(totalIncome);
  document.querySelector('.income__amount p').innerText=`$${totalIncome}`
}
showTotalExpense()
function showTotalExpense(){
  let items=getItemfromLS();
  //First get all data from LocalStorage
  //so now we need to add all data in +
  //we want to get all item from itrems
  let totalExpense=0;
  for(let item of items){
    if(item.type === '-'){
      totalExpense += parseInt(item.value);
    }
  }
  console.log(totalExpense);
  document.querySelector('.expense__amount p').innerText=`$${totalExpense}`

}

//Total Balance=Income-Expense

showTotalBalance();
function showTotalBalance(){
  let items=getItemfromLS();
  let balance=0;
  for(let item of items){
    if(item.type === '+'){
      balance += parseInt(item.value);
    }
    else{
      balance -= parseInt(item.value);
    }
  }
  document.querySelector('.balance__amount p').innerText=`$${balance}`

  // if(balance>=0){
  //   document.querySelector('header').className='green'
  // }
  // else{
  //   document.querySelector('header').className='red'
  // }
document.querySelector('header').className=(balance>=0) ? 'green' : 'red';

}



