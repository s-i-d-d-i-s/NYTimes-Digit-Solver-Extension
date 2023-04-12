
document.addEventListener("DOMContentLoaded", function () {
    const solve_button = document.getElementById("solve_button");



    solve_button.addEventListener("click", function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: function () {

                    function eval(a, b, op) {
                        if (op === '+') {
                            return a + b;
                        }
                        if (op === '-') {
                            return a - b;
                        }
                        if (op === '*') {
                            return a * b;
                        }
                        if (op === '/') {
                            return a / b;
                        }
                        return -1;
                    }

                    function get_str(a, b, op) {
                        return a.toString() + " " + op + " " + b.toString();
                    }

                    function get_next(numbers, i1, i2) {
                        let result = [];
                        for (let i = 0; i < numbers.length; i++) {
                            if (i === i1 || i === i2) {
                                continue;
                            }
                            result.push(numbers[i]);
                        }
                        return result;
                    }
                    function find_operations(numbers, target, result) {
                        if (numbers.length == 1) {
                            if (numbers[0] == target) {
                                return true;
                            }
                            return false;
                        }

                        for (let i = 0; i < numbers.length; i++) {
                            for (let j = 0; j < numbers.length; j++) {
                                if (i == j) continue;
                                for (let op of ['+', '-', '*', '/']) {
                                    let number_1 = numbers[i];
                                    let number_2 = numbers[j];

                                    if (op == '/' && (number_2 == 0 || number_1 % number_2 != 0)) {
                                        continue;
                                    }

                                    if (number_1 < number_2) {
                                        continue;
                                    }

                                    let numbers_next = get_next(numbers, i, j);
                                    numbers_next.push(eval(number_1, number_2, op));
                                    result.push(get_str(number_1, number_2, op));

                                    if (find_operations(numbers_next, target, result)) return true;

                                    result.pop();
                                }
                            }
                        }
                        return false;
                    }

                    function solve(target, numbers) {
                        results = [];
                        const solution = find_operations(numbers, target, results);
                        return `The solution is <br>${results.join('<br>')}`;
                    }

                    const gameStatusDesktop = document.getElementById("game-status-desktop");

                    // Clone the game-status-desktop element
                    const gameStatusDesktopSolution = gameStatusDesktop.cloneNode(true);

                    // Modify the ID and style properties of the cloned element
                    gameStatusDesktopSolution.id = "game-status-desktop-solution";

                    // Insert the cloned element after the original element
                    gameStatusDesktop.parentNode.insertBefore(gameStatusDesktopSolution, gameStatusDesktop)
                    const target = document.getElementById("target").textContent;
                    const numberDivs = document.querySelectorAll("div.number[id^='number-pos-']");
                    const numbers = Array.from(numberDivs).map(div => parseInt(div.innerText));
                    console.log(numbers);
                    const result = solve(target, numbers);
                    const resultDiv = document.getElementById("game-status-desktop-solution");
                    resultDiv.innerHTML = result;
                }
            });
        });
    });
});
