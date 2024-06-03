interface GameOptions{
    min: number;
    max: number;
    attempts: number;
}

class GuessingGame{
    private secretNumber: number;
    private attemptsLeft: number;
    private min: number;
    private max: number;

    constructor(options: GameOptions){
        this.min = options.min;
        this.max = options.max;
        this.attemptsLeft = options.attempts;
        this.secretNumber = this.generateSecretNumber();
    }

    private generateSecretNumber(): number{
        return Math.floor(Math.random()* (this.max - this.min + 1)) + this.min;

    }

    public play(): void{
        console.log(`Welcome to the guesing game`);
        console.log(`I'm am thinking of a number between ${this.max} and ${this.min}`);
        console.log(`You have attempts ${this.attemptsLeft} attempts to guess it`)


        while (this.attemptsLeft > 0){
            const userGuess = this.getUserInput();
            this.attemptsLeft --;

            if(userGuess === this.secretNumber){
                console.log(`Your guess was innit`);
                return;
            } else if (userGuess < this.secretNumber){
                console.log(`Guess is too low`);
            }else {
                console.log(`Gues too high`);
            }
        }
        console.log(`Game Over! thes secret was ${this.secretNumber}`);
    }

    private getUserInput(): number{
        let userInput: string;
        do{
           userInput = prompt(`Enter your Guess: `);
        }while (!this.isValidInput(userInput));

        return parseInt(userInput, 10);
    }

    private isValidInput(input: string): boolean{
        const num = parseInt(input, 10);
        return isNaN(num) && num > this.min && num <this.max;
    }
}
//create a new game with opptions
const gameOptions: GameOptions = {
    min: 1,
    max: 1000,
    attempts: 10,
};

const game = new GuessingGame(gameOptions);
game.play();
