'use strict';

////////////////////////////////ACCOUNT HOLDERS///////////////////////////////////////
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-07-26T17:01:17.194Z',
    '2020-07-28T23:36:17.929Z',
    '2020-08-01T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];



///////////////////////////////////WORKING ELEMENTS////////////////////////////////

//change login to get started to welcome
const labelWelcome = document.querySelector('.welcome');

//date below current balance label
const labelDate = document.querySelector('.date');

//below username password 0000EURO
const labelBalance = document.querySelector('.balance__value');

//in label
const labelSumIn = document.querySelector('.summary__value--in');

//out label
const labelSumOut = document.querySelector('.summary__value--out');

//intrest label
const labelSumInterest = document.querySelector('.summary__value--interest');

//logout timer
const labelTimer = document.querySelector('.timer');

//contains everything
const containerApp = document.querySelector('.app');

//transactions deposit or withdrawal all show here
const containerMovements = document.querySelector('.movements');


//buttons
const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

//inputs
const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');



//////////////////////Display Movments And Sort Them in accounts///////////////////////////////

const displayMovemnets=function(acc,sort=false){


    //empty the field
    containerMovements.innerHTML="";

    const movs=sort ? acc.movements.slice().sort((a,b)=>a -b) : acc.movements;

    movs.forEach(function(mov,i){

     //calculate weather money is deposit or withdrawal
    const type=mov>0 ? 'deposit' : 'withdrawal';

    //for date
    const date=new Date(acc.movementsDates[i]);

    const day=`${date.getDate()}`.padStart(2,0);

    const month=`${date.getMonth() + 1}`.padStart(2,0);

    const year=date.getFullYear();

    const displayDate=`${day}/${month}/${year}`;

     const html=`<div class="movements__row">

            <div class="movements__type movements__type--${type}">${i+1} ${type}</div>

            <div class="movements__date">${displayDate}</div>
            
            <div class="movements__value">${Math.abs(mov)}</div>

        </div>`;

        //console.log(mov);
       // console.log(i);

       //add movements of accounts in container movements
       containerMovements.insertAdjacentHTML('afterbegin',html);
    });
}

//displayMovemnets(account1.movements);



//////////////////////////Print Total balance//////////////////////////////////////////

const calcPrintBalance=function(acc){

    const balance=acc.movements.reduce(function(acc,cur){

        return acc+cur;
    },0);

    //create property balance in object
    acc.balance=balance;

    labelBalance.textContent=`${acc.balance} €`;
};

//calcPrintBalance(account1.movements);



///////////////////////////COMPUTE USERNAME/////////////////////////////////////////////
//use map
//join use to conver array into string


//const user="piyush malik";//pm

const createUsername=function(accs){

    accs.forEach(function(acc){

        acc.username=acc.owner.toLowerCase().split(' ').map(function(name){

            return name[0];
        
        }).join('');
        
    });

}

createUsername(accounts);
//console.log(accounts);


//////////////////////////////////Timer/////////////////////////////////////////////
const startLogOutTimer = function () {
    const tick = function () {
      const min = String(Math.trunc(time / 60)).padStart(2, 0);
      const sec = String(time % 60).padStart(2, 0);
  
      // In each call, print the remaining time to UI
      labelTimer.textContent = `${min}:${sec}`;
  
      // When 0 seconds, stop timer and log out user
      if (time === 0) {
        clearInterval(timer);
        labelWelcome.textContent = 'Log in to get started';
        containerApp.style.opacity = 0;
      }
  
      // Decrease 1s
      time--;
    };
  
    // Set time to 5 minutes
    let time = 120;
  
    // Call the timer every second
    tick();
    const timer = setInterval(tick, 1000);
  
    return timer;
  };

/////////////////////////////LOGIN/////////////////////////////////////////////////////
let currentAccount,timer;

btnLogin.addEventListener('click',function(e){

    //prevent for submitting
    e.preventDefault();
    currentAccount=accounts.find(function(acc){

        return acc.username===inputLoginUsername.value;
    });
    console.log(currentAccount);

    //check currentAccount pin is correct or not
    if(currentAccount?.pin === Number(inputLoginPin.value)){

        console.log('Login');
        //display UI welcome user
        
        //take only first name
        labelWelcome.textContent=`Welcome back, ${currentAccount.owner.split(' ')[0]}`;
        
        //opacity 100 when user login
        containerApp.style.opacity=100; 

        //time
        const date=new Date();

        const day=`${date.getDate()}`.padStart(2,0);

        const month=`${date.getMonth() + 1}`.padStart(2,0);

        const year=date.getFullYear();

        labelDate.textContent=`${day}/${month}/${year}`;

        //clear input fileds of username and password
        inputLoginUsername.value=inputLoginPin.value="";
        inputLoginPin.blur();

        //timer
        if (timer) clearInterval(timer);
        timer = startLogOutTimer();


        //show balance
        calcPrintBalance(currentAccount);

        //display movements in grid
        displayMovemnets(currentAccount);

        //display summary
        calcDisplaySummary(currentAccount);

                

    }


});

//////////////////////////////TRANSFER BUTTON//////////////////////////////////////////
btnTransfer.addEventListener("click",function(e){

    e.preventDefault();

    //amount to transfer
    const amount=Number(inputTransferAmount.value);

    //where to transfer
    const receiverAcc=accounts.find(function(acc){

        return acc.username===inputTransferTo.value});

        console.log(amount,receiverAcc);

        //clear fields
        inputTransferAmount.value=inputTransferTo.value="";

        //amount that transfer greater than 0 and balance is not less than amount
        //cannot be transfer to itself
        if(amount >0 && currentAccount.balance >=amount &&

             receiverAcc?.username!==currentAccount.username){

                console.log("transfer valid");
                //negative amount where transfer happens
                currentAccount.movements.push(-amount);
                //add transfer to where it send
                receiverAcc.movements.push(amount);

                //time
                currentAccount.movementsDates.push(new Date());
                receiverAcc.movementsDates.push(new Date());

                //show balance
                calcPrintBalance(currentAccount);

                //display movements in grid
                displayMovemnets(currentAccount);

                //display summary
                calcDisplaySummary(currentAccount);
        } 

});


//////////////////////////////////CLOSING THE ACCOUNT////////////////////////////////
btnClose.addEventListener('click',function(e){

    e.preventDefault();
    //check credentials

    if(inputCloseUsername.value===currentAccount.username &&
        Number(inputClosePin.value)===currentAccount.pin){
           
            //find index
            const index=accounts.findIndex(function(acc){

                return acc.username===currentAccount.username;
            });
            console.log(index);

            //delete index
            accounts.splice(index,1);
            //hide ui
            containerApp.style.opacity=0;
        }
});

/////////////////////////LOAN AMOUNT/////////////////////////////////////////////////
btnLoan.addEventListener('click',function(e){

    e.preventDefault();    

    const amount=Number(inputLoanAmount.value);
    //The some() method tests whether at least one element in the array passes the test

    if(amount>0 && currentAccount.movements.some(mov=> mov >= amount * 0.1)){

        currentAccount.movements.push(amount);

        //time
        currentAccount.movementsDates.push(new Date());

        //show balance
        calcPrintBalance(currentAccount);

        //display movements in grid
        displayMovemnets(currentAccount);

        //display summary
        calcDisplaySummary(currentAccount);

    }
    inputLoanAmount.value="";
    
});

/////////////////////////////Sorting done in display movements/////////////////
let sorted;
btnSort.addEventListener('click',function(){

    displayMovemnets(currentAccount.movements,!sorted);
    sorted=!sorted;
});



//////////////////////////Display in or sum or intrest label///////////////////////////

const calcDisplaySummary=function(acc){

    const income=acc.movements.filter(function(mov){

        return mov>0;

    }).reduce(function(acc,mov){

        return acc+mov;         
    
    },0);

    labelSumIn.textContent=`${income}€`;

    //withdrawal

    const out=acc.movements.filter(function(mov){

        return mov<0;

    }).reduce(function(acc,mov){

        return acc+mov;         
    
    },0);

    labelSumOut.textContent=`${Math.abs(out).toFixed(2)}€`;

    //intrest
    const intrest=acc.movements.filter(function(mov){

        return mov >0;
    
    }).map(deposit=>(deposit * acc.interestRate)/100
       
    
    ).reduce(function(acc,cur){

        return acc+cur;
    },0);

    labelSumInterest.textContent=`${intrest.toFixed(2)}€`;
};

//calcDisplaySummary(account1.movements);






