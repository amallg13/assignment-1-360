
const storyImage = document.getElementById("storyImage");
const storyTitle = document.getElementById("storyTitle");
const storyText = document.getElementById("storyText");
const progress = document.getElementById("progress");
const storyChoices = document.getElementById("storyChoices");
const clueCount = document.getElementById("clueCount");
const clueList = document.getElementById("clueList");

// Remember everything the reader discovers
let clues = [];
let drinksChecked = [];
let customersQuestioned = [];
let orderScreenFound = false;
let baristaNoteFound = false;
let noahCupChecked = false;

const images = {
    1: "images/First Scene Cafe.jpeg",
    2: "images/where is maya_s drink_.jpeg",
    3: "images/reciept.jpeg",
    4: "images/pick up missing.jpeg",
    5: "images/threedrinks.jpeg",
    6: "images/barista station.jpeg",
    7: "images/orderscreen.jpeg",
    8: "images/clue.jpeg",
    9: "images/noahdrink.jpeg",
    10: "images/sofiadrink.jpeg",
    11: "images/liamdrink.jpeg",
    12: "images/noahdrink.jpeg",
    13: "images/bulletinboard.jpeg",
    14: "images/answerselection.jpeg",
    15: "images/casesolved.jpeg",
    16: "images/wronganswer.jpeg"
};



// Display one image and its available choices
function showMoment(image, title, text, buttons, number) {
    storyImage.src = images[image];    storyImage.alt = title;
    storyTitle.textContent = title;
    storyText.textContent = text;
    progress.textContent = number;
    storyChoices.innerHTML = "";

    buttons.forEach(function(choice) {
        const button = document.createElement("button");
        button.textContent = choice.text;
        button.type = "button";

        button.addEventListener("click", choice.action);

        storyChoices.appendChild(button);
    });

    updateClues();
}

// Save clues without counting the same clue twice
function addClue(clue) {
    if (!clues.includes(clue)) {
        clues.push(clue);
    }

    updateClues();
}

// Update the visible evidence collection
function updateClues() {
    clueCount.textContent = clues.length;
    clueList.innerHTML = "";

    clues.forEach(function(clue) {
        const item = document.createElement("li");
        item.textContent = clue;
        clueList.appendChild(item);
    });
}

// IMAGE 1: CAFE OPENING

function startStory() {
    showMoment(
        1,
        "Welcome to the Cafe",
        "Explore the cafe and help Maya find her missing latte.",
        [
            {
                text: "Enter the Cafe",
                action: showMissingDrink
            }
        ],
        "Opening Scene"
    );
}

// IMAGE 2: MAYA'S MISSING DRINK

function showMissingDrink() {
    showMoment(
        2,
        "Where Is Maya's Drink?",
        "Maya: My large iced vanilla latte with oat milk is gone! " +
        "The barista called my name, but the drink wasn't there.",
        [
            {
                text: "Inspect Maya's Receipt",
                action: showReceipt
            }
        ],
        "Scene 1: The Mystery"
    );
}

// IMAGE 3: RECEIPT CLUE

function showReceipt() {
    addClue("Maya's Receipt");

    showMoment(
        3,
        "Clue 1: Maya's Receipt",
        "Order #27: Large iced vanilla latte, oat milk, vanilla syrup.",
        [
            {
                text: "Continue to the Pickup Counter",
                action: showEmptyCounter
            }
        ],
        "Clue 1 of 5"
    );
}

// IMAGES 4 AND 5: PICKUP COUNTER

function showEmptyCounter() {
    showMoment(
        4,
        "The Empty Pickup Counter",
        "Maya's drink is missing. Let's investigate the counter.",
        [
            {
                text: "Look at the Drinks",
                action: showDrinks
            }
        ],
        "Scene 2: Pickup Counter"
    );
}

function showDrinks() {
    showMoment(
        5,
        "Inspect the Drinks",
        "Three drinks remain. Click each one to inspect the order.",
        [
            {
                text: "Sofia's Drink",
                action: function() {
                    inspectDrink("Sofia");
                }
            },
            {
                text: "Liam's Drink",
                action: function() {
                    inspectDrink("Liam");
                }
            },
            {
                text: "Noah's Drink",
                action: function() {
                    inspectDrink("Noah");
                }
            },
            {
                text: "Continue to Barista Station",
                action: function() {
                    if (drinksChecked.length === 3) {
                        showBaristaStation();
                    } else {
                        showDrinks();
                        storyText.textContent =
                            "Inspect all three drinks before continuing.";
                    }
                }
            }
        ],
        "Scene 2: Pickup Counter"
    );
}

function inspectDrink(person) {

    let description;

    if (person === "Sofia") {

        description =
            "Cup A belongs to Sofia. She ordered a small hot cappuccino " +
            "with whole milk. This does not match Maya's large iced latte.";

    }

    else if (person === "Liam") {

        description =
            "Cup B belongs to Liam. He ordered a medium iced matcha " +
            "with almond milk. This does not match Maya's latte.";

    }

    else if (person === "Noah") {

        description =
            "Cup C belongs to Noah. He ordered a large iced caramel latte " +
            "with oat milk. His drink is very similar to Maya's!";

        addClue("Noah's Drink");
    }

    if (!drinksChecked.includes(person)) {
        drinksChecked.push(person);
    }

    showMoment(
        5,
        person + "'s Drink",
        description,
        [
            {
                text: "Return to the Pickup Counter",
                action: showDrinks
            }
        ],
        "Scene 2: Inspecting Drinks"
    );
}

// IMAGE 6: BARISTA STATION

function showBaristaStation() {
    showMoment(
        6,
        "The Barista Station",
        "Look for evidence that could explain how Maya's drink disappeared.",
        [
            {
                text: "Check the Order Screen",
                action: showOrderScreen
            },
            {
                text: "Read the Barista Note",
                action: showBaristaNote
            },
            {
                text: "Question the Customers",
                action: function() {
                    if (orderScreenFound && baristaNoteFound) {
                        showCustomers();
                    } else {
                        showBaristaStation();
                        storyText.textContent =
                            "Find both clues at the barista station first.";
                    }
                }
            }
        ],
        "Scene 3: Barista Station"
    );
}

// IMAGE 7: ORDER SCREEN CLUE

function showOrderScreen() {
    orderScreenFound = true;
    addClue("Order Screen");

    showMoment(
        7,
        "Clue 2: Order Screen",
        "Order #27: Maya — large iced vanilla latte with oat milk. " +
        "Order #28: Noah — large iced caramel latte with oat milk. " +
        "The drinks are almost identical!",
        [
            {
                text: "Return to Barista Station",
                action: showBaristaStation
            }
        ],
        "Clue 2 of 5"
    );
}

// IMAGE 8: BARISTA NOTE CLUE

function showBaristaNote() {
    baristaNoteFound = true;
    addClue("Barista Note");

    showMoment(
        8,
        "Clue 3: Barista Note",
        '"Orders 27 and 28 looked almost identical. Double-check the labels!" ' +
        "Someone may have picked up the wrong drink.",
        [
            {
                text: "Return to Barista Station",
                action: showBaristaStation
            }
        ],
        "Clue 3 of 5"
    );
}

// IMAGES 9, 10 AND 11: CUSTOMERS

function showCustomers() {
    showMoment(
        6,
        "Question the Customers",
        "Speak to each customer and compare their stories.",
        [
            {
                text: "Question Noah",
                action: function() {
                    questionCustomer("Noah");
                }
            },
            {
                text: "Question Sofia",
                action: function() {
                    questionCustomer("Sofia");
                }
            },
            {
                text: "Question Liam",
                action: function() {
                    questionCustomer("Liam");
                }
            },
            {
                text: "Inspect Noah's Cup",
                action: function() {
                    if (customersQuestioned.length === 3) {
                        inspectNoahCup();
                    } else {
                        showCustomers();
                        storyText.textContent =
                            "Question all three customers before inspecting the cup.";
                    }
                }
            }
        ],
        "Scene 4: Customer Interviews"
    );
}

function questionCustomer(person) {
    let image;
    let description;

    if (person === "Noah") {
        image = 9;
        description =
            'Noah says: "I grabbed the drink beside mine without checking the label." ' +
            "His drink order is almost identical to Maya's.";
    } else if (person === "Sofia") {
        image = 10;
        description =
            "Sofia says she ordered a small hot cappuccino with whole milk. " +
            "Her order does not match Maya's.";
    } else {
        image = 11;
        description =
            'Liam says: "I ordered matcha." His medium iced matcha ' +
            "with almond milk does not match Maya's latte.";
    }

    if (!customersQuestioned.includes(person)) {
        customersQuestioned.push(person);
    }

    showMoment(
        image,
        "Questioning " + person,
        description,
        [
            {
                text: "Return to the Customers",
                action: showCustomers
            }
        ],
        "Scene 4: Customer Interviews"
    );
}

// =====================================
// IMAGE 12: NOAH'S CUP CLUE
// =====================================

function inspectNoahCup() {
    noahCupChecked = true;
    addClue("Noah's Cup");

    showMoment(
        12,
        "Clue 5: Noah's Cup",
        "The label on Noah's cup is partly hidden. The visible name " +
        "looks like MAYA. Did Noah accidentally take her drink?",
        [
            {
                text: "Review the Evidence",
                action: showEvidenceBoard
            }
        ],
        "Final Clue"
    );
}

// IMAGE 13: EVIDENCE BOARD


function showEvidenceBoard() {
    showMoment(
        13,
        "The Evidence Board",
        "Review your collected clues before making your accusation. " +
        "You have found " + clues.length + " out of 5 clues.",
        [
            {
                text: "Question Customers Again",
                action: showCustomers
            },
            {
                text: "Make Your Accusation",
                action: function() {
                    if (
                        clues.length === 5 &&
                        customersQuestioned.length === 3 &&
                        noahCupChecked
                    ) {
                        showAnswerSelection();
                    } else {
                        showEvidenceBoard();
                        storyText.textContent =
                            "Explore all the evidence and question every customer before deciding.";
                    }
                }
            }
        ],
        "Scene 5: Review the Evidence"
    );
}

// IMAGE 14: CHOOSE A SUSPECT

function showAnswerSelection() {
    showMoment(
        14,
        "Who Took Maya's Latte?",
        "You've gathered the evidence. Who do you think picked up Maya's drink?",
        [
            {
                text: "Noah",
                action: function() {
                    showEnding(true);
                }
            },
            {
                text: "Sofia",
                action: function() {
                    showEnding(false);
                }
            },
            {
                text: "Liam",
                action: function() {
                    showEnding(false);
                }
            }
        ],
        "Scene 6: Your Decision"
    );
}

// IMAGES 15 AND 16: ENDINGS

function showEnding(correct) {
    if (correct) {
        showMoment(
            15,
            "Case Solved!",
            "You solved the mystery! Noah accidentally picked up Maya's " +
            "latte because their drinks looked almost identical.",
            [
                {
                    text: "Play Again",
                    action: restartStory
                }
            ],
            "Mystery Solved"
        );
    } else {
        showMoment(
            16,
            "Wrong Answer!",
            "That suspect's drink does not match Maya's order. " +
            "Review the evidence and try again.",
            [
                {
                    text: "Review the Evidence",
                    action: showEvidenceBoard
                },
                {
                    text: "Try Again",
                    action: showAnswerSelection
                }
            ],
            "Try Again"
        );
    }
}

// RESTART THE MYSTERY

function restartStory() {
    clues = [];
    drinksChecked = [];
    customersQuestioned = [];
    orderScreenFound = false;
    baristaNoteFound = false;
    noahCupChecked = false;

    startStory();
}

document.getElementById("restartButton").addEventListener(
    "click",
    restartStory
);

// Open the first scene when the website loads
startStory();

