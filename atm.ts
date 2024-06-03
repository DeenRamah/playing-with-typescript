interface User{
    id: number;
    password: string;
    secretNumber: number;
    balance: number;
    currenvy: string;
    country: string;
}

interface Transaction {
    amount: number;
    purpose: string;
    timestamp: Date;
}

class ATM {
    private users: User[];
    private trasactions: Transaction[];

    constructor(){
        this.users =[];
        this.transactions =[];
    }

    public createUser(id: number, password: string, secretNumber: number, balance: number, country: string, currency: string): void{
        this.users.push({id, password, secretNumber, balance, currency, country});
    }

    public authenticate(id: number, password: string, secretNumber: number): boolean{
        const user = this.users.find((user) => user.id === id);
        if(!user) return false;
        if(user.password !== password || user.secretNumber !== secretNumber) return false;
        return true;
    }

    public getBalance(id: number): number{
        const user = this.users.find((user) => user.id ===id);
        if(!user) return -1;
        return user.balance;
    }

    public withdrawal(id: number, amount: number, purpose: string): boolean{
        if(!this.authenticate(id, prompt("Enter Password: "), parseInt(prompt("Enter secret number: "), 10)))return false;
        const user = this.users.find((user) => user.id === id);
        if(!user) return false;
        if (amount < 0 || amount > user.balance) return false;
        user.balance -= amount;
        this.transactions.push({amount, purpose, timestamp: new Date()});
        return true;
    }

    public deposit(id: number, amount: number): boolean{
        if(!this.authenticate(id, prompt("Enter Password: "), parseInt(prompt("Enter secret number: "), 10))) return false;;
        const user =  this.users.find((user) => user.id ===id);
        if(!user) return false;
        user.balance += amount;
        this.transactions.push({amount, purpose: "Deposit", timestamp: new Date()});
        return true;
    }

    public transfer(id: number, recepientId: number, amount: number): boolean{
        if(!this.authenticate(id. prompt("Enter Password: "), parseInt("Enter secret number: "), 10)) return false;
        const user = this.users.find((user) => user.id === id);
        const recepient = this.users.find((user) => user.id === id);
         if (!this || recepient) return false;
         if(amount < 0 || amount > user.balance) return false;
          user.balance -= amount;
          recepient.balance += amount;
          this.trasactions.push({amount, purpose: "Transfer", timestamp: new Date()});
          return true;
    }

    public hideAccount(id: number, duration: number): boolean {
        if(!this.authenticate(id, prompt("Enter Password: "), parseInt(prompt("Enter secert number: "), 10))) return false;
        const user = this.users.find((user) =>user.id === id);
        if (!user) return false;

        user.balance = 0;
        setTimeout(() =>{
            user.balance = this.getBalance(id);
        }, duration * 1000);
        return true;
    }
    public storeInHiddenAccount(id: number, amount: number, duration: number): boolean{
        if(!this.authenticate(id, prompt("Enter password"), parseInt(prompt("Enter secret number: "), 10))) return false;
        const user = this.users.find(user) => user.id ===id;
        if(!user) return false;
        if (amount < 0 || amount > user.balance ) return false;
        user.balance -= amount;
        setTimeout(()=>{
            user.balance += amount;
        }, duration * 1000);
        return true;
    }

    const atm = ATM();

    atm.createUser(1, "hjdhhdfg123", 1243, 1000, "USD", "USA");
    atm.createUser(2, "passdWf123", 2322, 2000, "CAD", "Canada");

}