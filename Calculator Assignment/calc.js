var screen = document.getElementById("display"); //output screen

// Variables to store calculator values and operators.
var operand_one = "";
var operand_two = "";
var op = ""; // op stands for operator (+,-,*,/)
var prev_operand = "";//used for consecutove equals after an operation


/**
 * Used to get answer for the calculation.
 * @param exp mathematical expression to be solved eg "3-5", "4/2", "89+9/3", etc
 * @returns {number} if exp is valid
 * @returns empty string if error
 */
function solve(exp){ 
    if (exp.length==0){
        return exp; // emtpy expression equals error.
    }
    try{
        return eval(exp);
    }catch{
        return "";
    }
}

// activating the button elements from HTML
document.querySelectorAll("button").forEach(e=>{ // iterating over each button element
    e.addEventListener("click",e=>{
        let clicked_button_element = e.target; //accessing the actual element from click event.
        // if the button is operator
        if(clicked_button_element.classList.contains("operator")){ 
            if (screen.value.length>0){// if there is something in display
                if(operand_one && op){// if first operand and oeprator is selected.
                    if (!operand_two){ // if the second operand is not yet selected.
                        op = clicked_button_element.value; // then setting the operator
                    }
                    /*But if the second operand if already selected,
                    performing previous opepration on the current output.*/
                    else{
                        operand_two = screen.value;// using display value as second operand
                        screen.value= solve(operand_one+op+operand_two);//calculating & displaying
                        operand_two="";//again making the second operand empty for next operation
                        op = clicked_button_element.value;// operation to current operation
                        operand_one = screen.value;// first operand to the current output.
                    }
    
                }else{//if first operand is not selected, setting the display as first operand
                    op = clicked_button_element.value;
                    operand_one = screen.value;
                    operand_two = ""// clearing out the operand for safety.
                }
            }else{// if display screen is empty,
                // checking if the operator button is minus(-)
                // if the operator is minus(-), then allowing it in display as a negative number
                if(clicked_button_element.value=="-" && !operand_one){
                    screen.value+=clicked_button_element.value;
                }
            }
        }
        //if the button is equals button
        else if (clicked_button_element.value==="="){
            var result = solve(operand_one+op+operand_two);// try to solve.
            if (result){// if valid result
                //update the prev_operand to the second operand for consecutive equals operation.
                prev_operand = operand_two+"";
                //display the result
                screen.value = result;
                // clear out the operands for next calculation.
                operand_two = "";
                operand_one = "";
            }else{// if the result is empty string (some error occured)
                if(prev_operand && screen.value && op){//if the operation is consecutive equals
                    var res = solve(screen.value+op+prev_operand);//doing the operation.
                    if (res){// again if the answer is possible, display
                        screen.value = res;
                    }
                }
            }
        }
        // if the button is clear button, reseting the whole app.
        else if(clicked_button_element.value==="cls"){
            operand_one = "";
            op = "";
            operand_two = "";
            screen.value="";
            prev_operand = "";
        }
        // if the button is a numbered one
        else{
            if (op){// if an operator is already selected, first operand is already selected
                if (!operand_two){ // if second operand is not entered.
                    screen.value = clicked_button_element.value;//display set to the button clicked
                    operand_two = clicked_button_element.value;//set the operand 2 to the button clicked
                }else{ //if second operand is entered, concatinating the digits for second operand
                    screen.value+=clicked_button_element.value;
                    operand_two = screen.value;
                }
            }else{// if no operator is selected, just displaying the button.
                screen.value += clicked_button_element.value;
            }
        }
    });
});