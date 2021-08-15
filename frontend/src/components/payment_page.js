import React, {useState} from 'react'
import ScriptTag from 'react-script-tag';
import {useHistory} from 'react-router-dom';
import axios from 'axios'

const Payment = () => {
    let history = useHistory();
    const [details, setDetails] = useState({email:'', amount:'', firstName:'', lastName:''})

    const handleChange = (e)=>{
     let name = e.target.name;
     let value = e.target.value;
     setDetails({...details, [name]: value })
    }
    const payWithPaystack = (e)=>{
     e.preventDefault(); 
     if(details.email && details.amount && details.firstName && details.lastName !== ''){
        let handler = window.PaystackPop.setup({
            key: 'pk_test_2cae9d8b7a6ddd86baeeee57e44b2c8e2761da66', // Replace with your public key
            email: details.email,
            amount: details.amount * 100,
            firstname:details.firstName,
            lastname:details.lastName,
            ref: 'Gr'+Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
            // label: "Optional string that replaces customer email"
            onClose: function(){
              history.push('/');
            },
            callback: function(response){
                axios({
                    method: 'get',
                    url: 'http://localhost/paystack/backend/verify_payment.php?reference='+ response.reference,
                    responseType: 'stream',
                  })
                    .then(function (response) {
                     let res = response.data;
                     if(res === 'success'){
                      history.push('/success')
                     }else{
                     history.push('/error')  
                     }
                    });
            }
    
          });
          handler.openIframe(); 
     }
     
    }
    return (
        <>
    <ScriptTag isHydrating={false} type="text/javascript" src="https://js.paystack.co/v1/inline.js" /> 
    <div class="container">
    <div class="row">
        <div class="col">
                <form  class="box" onSubmit={payWithPaystack}>
                    <h1>Payment Page</h1>
                    <p class="text-muted"> Please enter your details</p> 
                    <input type="email" name="email" placeholder="Email" onChange={handleChange} value={details.email}/> 
                    <input type="number" name="amount" placeholder="Amount" onChange={handleChange} value={details.amount}/>
                    <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} value={details.firstName}/>
                    <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} value={details.lastName}/>
                     <input type="submit" name="" value="Pay"/>
                </form> 
          
        </div>
    </div>
</div>

        </>
    )
}

export default Payment;