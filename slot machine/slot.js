class SlotMachine {
    constructor() {
        this.balance = 1000;
        this.slots = [{
                name: "Lucky 7",
                prob: 0.07,
                prize2: 700,
                prizeAll: 7000,
                imagesUrl: "images/lucky7.png",
            },
            {
                name: "Banana",
                prob: 0.3,
                prize2: 400,
                prizeAll: 400,
                imagesUrl: "images/banana.png",
            },
            {
                name: "Skull",
                prob: 0.6,
                prize2: -200,
                prizeAll: 0, //special case
                imagesUrl: "images/skull.png",
            },
            {
                name: "Cherry",
                prob: 1.0,
                prize2: 150,
                prizeAll: 150,
                imagesUrl: "images/cherry.png",
            },
        ];
        this.addEvent();
        this.initBalance = document.querySelector(".balance");
        this.initBalance.innerHTML = "Your Balance: " + this.balance;
    }

    addEvent() {
        let x = document.querySelector(".buzzer");
        x.addEventListener("click", () => {
            // let spin = setInterval(this.spinning(), 50);
            // setTimeout(clearInterval(spin), 1000);
            let result = this.play();
            this.displayResult(result);
        });
    }

    // spinning() {
    //     let imageSlot = document.querySelectorAll(".a1");
    //     let image = document.createElement("img");

    //     for (let i = 0; i < imageSlot.length; i++) {
    //         image.src = "";
    //         image.src = this.slots[Math.floor(Math.random() * 4)].imagesUrl;
    //         imageSlot[i].innerHTML = "";
    //         imageSlot[i].appendChild(image);
    //     }
    // }

    displayResult(result) {
        for (let i = 0; i < result.length; i++) {
            let image = document.createElement("img");
            image.src = this.slots.find(({ name }) => name === result[i]).imagesUrl;
            let imageSlot = document.querySelectorAll(".a1");
            imageSlot[i].innerHTML = "";
            imageSlot[i].appendChild(image);
        }
    }

    play() {
        let result = [];
        if (this.balance >= 100) {
            this.balance -= 100;
        } else {
            alert("Out of money, stopp.");
            return 0;
        }
        for (let i = 0; i < 3; i++) {
            result.push(this.probability());
        }
        this.initBalance.innerHTML = "Your balance: " + this.countBalance(result);
        return result;
    }

    probability() {
        let result = "";
        const r = Math.random();
        for (let i = 0; i < this.slots.length; i++) {
            if (r < this.slots[i].prob) {
                result = this.slots[i].name;
                break;
            }
        }
        return result;
    }

    countBalance(result) {
        const sortedBlock = result.sort();
        let duplicateValue = "";
        let allEqualValue = "";
        const isEqualAll = result.every((x) => x === result[0]);

        if (isEqualAll == true) {
            allEqualValue = result[0];
        }

        for (let i = 0; i < sortedBlock.length; i++) {
            if (sortedBlock[i] == sortedBlock[i + 1]) {
                duplicateValue = sortedBlock[i];
            }
        }

        for (let i = 0; i < this.slots.length; i++) {
            if (allEqualValue == "Skull") {
                this.balance = Math.round(this.balance / 2);
                break;
            }

            if (allEqualValue == this.slots[i].name) {
                this.balance += this.slots[i].prizeAll;
                break;
            } else if (duplicateValue == this.slots[i].name) {
                this.balance += this.slots[i].prize2;
                break;
            }
        }
        return this.balance;
    }
}

function setup() {
    var demo = new SlotMachine();
}

setup();