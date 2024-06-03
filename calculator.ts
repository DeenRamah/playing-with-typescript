import React, {useState} from 'eact';

interface Iprops{
    input: string | null;
    error: boolean;
}

const Input:React.FC <Iprops> = ({input, error}) =>{
    return(
        <div className ="input-container">
        {error? <h1> Error </h2> : <h1>{input? input : "0"} </h1>}
        </div>
    );
};

interface Operators{
    "+": (n1: number, n2: number) => number;
    "-": (n1: number, n2: number) => number;
    "*": (n1: number, n2: number) => number;
    "÷": (n1: number, n2: number) => number;
    "-/+": (n1: number, n2: number) => number;
    "%": (n1:number, n2: number) => number;
    "sqrt":(n: number) => number;
    "square":(n:number) => number;
    "log": (n: number) => number;
    "sin": (n: number) => number;
    "cos": (n: number) => number;
    "tan": (n: number) => number;
}

const operations: Operators = {
    "+": (n1, n2) => n1 + n2,
    "-": (n1, n2) => n1 - n2,
    "*": (n1, n2) => n1 * n2,
    "÷": (n1, n2) => n1 / n2,
    "%": (n1, n2) => n2 / 100,
    "-/+": (n1, n2) => n2 * -1,
    "sqrt": (n) => Math.sqrt(n),
    "square": (n) => n * n,
    "log": (n) => Math.log(n),
    "sin": (n) => Math.sin(n),
    "tan": (n) => Math.tan(n),
    "cos": (n) => Math.cos(n),
};

const Calculator: React.FC = () => {
    const [input, setInput] = useState<string | null>(null);
    const [total, setTotal] = useState<number | null>(null);
    const [prevSymbol, setPrevsymbol] = useState<string | null>(null);
    const [showOldInput, setShowOldInput] = useState(false);
    const [equalSignPressed, setequalSignPressed] = useState(false);

    const handleButtonPress = (value: string): void =>{
        if(showOldInput){
            setShowOldInput(false);
        }
        const numValue: number = parseInt(value);
        if(Number.isNaN(numValue)){
            handleSymbol(value);
        }else{
            storeNumToScreen(value);
            if (equalSignPressed){
                setTotal(0);
            }
        }

        if(value !== '='){
            setequalSignPressed((value === '+/-' && equalSignPressed || value === '.' && equalSignPressed));
        }
    
    };

    const handleSymbol = (symbol: string): void =>{
        switch (symbol){
            case "+":
            case "-":
            case "X":
            case "÷":
                if(input === null || prevSymbol === null){
                    if(prevSymbol === null){
                        if(input !== null) setTotal(parseFloat(input));
                        prepareNextOperation(symbol);
                    }
                    return;
                }

                const newTotal: number = calculate(parseFloat(input), total, prevSymbol);
                setTotal(newTotal);
                prepareNextOperation(symbol);

                break;
            case "sqrt":
            case "square":
            case "log":
            case "sin":
            case "cos":
            case "tan":
                if(input ===  null) return;
                const result: number = operations[symbol](parseFloat(input));
                setInput(result.toString());
                break;
            default:
                break;
        }
    };
    
    const prepareNextOperation = (symbol: string): void =>{
        setPrevsymbol(symbol);
        setInput(null);
    };

    const calculate = (n1: number, n2: number, symbol: string): number =>{
        return operations[symbol](n1, n2);
    };

    const storeNumToScreen = (value: string): void =>{
        if(input === null){
            setInput(value);

        }else{
            setInput(input + value);
        }
    };

    return(
        <div>
        <Input input = {input} error = {false} />

        <button onclick = {()=> handleButtonPress("0")}>0</button>
        <button onclick = {()=> handleButtonPress("1")}>1</button>
        <button onclick = {()=> handleButtonPress("2")}>2</button>
        <button onclick = {()=> handleButtonPress("3")}>3</button>
        <button onclick = {()=> handleButtonPress("4")}>4</button>
        <button onclick = {()=> handleButtonPress("5")}>5</button>
        <button onclick = {()=> handleButtonPress("6")}>6</button>
        <button onclick = {()=> handleButtonPress("7")}>7</button>
        <button onclick = {()=> handleButtonPress("8")}>8</button>
        <button onclick = {()=> handleButtonPress("9")}>9</button>
        <button onclick = {()=> handleButtonPress("+")}>+</button>
        <button onclick = {()=> handleButtonPress("-")}>-</button>
        <button onclick = {()=> handleButtonPress("x")}>x</button>
        <button onclick = {()=> handleButtonPress("÷")}>÷</button>
        <button onclick = {()=> handleButtonPress(".")}>.</button>
        <button onclick = {()=> handleButtonPress("sqrt")}>√</button>
        <button onclick = {()=> handleButtonPress("square")}>x²</button>
        <button onclick = {()=> handleButtonPress("log")}>log</button>
        <button onclick = {()=> handleButtonPress("sin")}>sin</button>
        <button onclick = {()=> handleButtonPress("cos")}>cos</button>
        <button onclick = {()=> handleButtonPress("tan")}>tan</button>
        <button onclick = {()=> handleButtonPress("+/-")}>+/-</button>
        <button onclick = {()=> handleButtonPress("%")}>%</button>
        <button onclick = {()=> handleButtonPress("=")}>=</button>
        </div>
    );
};

export default Calculator;