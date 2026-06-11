import chessReducer from './reducers/chessReducer';
import sudokuReducer from './reducers/sudokuReducer';
import lotReducer from './reducers/lotReducer';
import wordleReducer from './reducers/wordleReducer';
import typingReducer from './reducers/typingReducer';
import usersReducer from './reducers/usersReducer';
import currentuserReducer from './reducers/currentUserReducer';

const LOGIN_USER = 'LOGIN-USER';

let store = {
    USERS_STATE: {
        usersData: [
            {
                id: 1,
                username: 'admin',
                password: 'Adminpass21.',
                isAdmin: true,
                streakEveryGame: {
                    wordleStreak: 0,
                    sudokuStreak: 0,
                    typerStreak: 0,
                    lotStreak: 0,
                    chessStreak: 0
                },
                anyGameStreak: 0,
                fullSetStreak: 0,
                todayGames: {
                    isWordleDone: false,
                    isSudokuDone: false,
                    isTyperDone: false,
                    isLotDone: false,
                    isChessDone: false
                }
            }
        ],
        _isSafePassword(password) {

            if (password.length < 8) {
                return { isValid: false, message: 'Пароль должен содержать минимум 8 символов' };
            }

            // Хотя бы одна заглавная буква
            if (!/[A-Z]/.test(password)) {
                return { isValid: false, message: 'Пароль должен содержать хотя бы одну заглавную букву' };
            }

            // Хотя бы одна строчная буква
            if (!/[a-z]/.test(password)) {
                return { isValid: false, message: 'Пароль должен содержать хотя бы одну строчную букву' };
            }

            // Хотя бы одна цифра
            if (!/[0-9]/.test(password)) {
                return { isValid: false, message: 'Пароль должен содержать хотя бы одну цифру' };
            }

            // Хотя бы один спецсимвол
            if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
                return { isValid: false, message: 'Пароль должен содержать хотя бы один спецсимвол' };
            }

            return { isValid: true, message: 'Пароль надёжный' };
        },
        // userdata = [username, password]
        addUser(userdata) {
            let newUser = {
                id: 0,
                username: '',
                password: '',
                isAdmin: false,
                streakEveryGame: {
                    wordleStreak: 0,
                    sudokuStreak: 0,
                    typerStreak: 0,
                    lotStreak: 0,
                    chessStreak: 0
                },
                anyGameStreak: 0,
                fullSetStreak: 0,
                todayGames: {
                    isWordleDone: false,
                    isSudokuDone: false,
                    isTyperDone: false,
                    isLotDone: false,
                    isChessDone: false
                }
            };
            if (userdata.username !== '' || !this.usersData.find(some => some.username === userdata.username)) {
                if (this._isSafePassword(userdata.password).isValid) {
                    newUser.username = userdata.username;
                    newUser.password = userdata.password;
                    newUser.id = this.usersData.length + 1;
                    this.usersData.push(newUser);
                    console.log(this.usersData);
                    return 'user was added';
                } else {
                    return 'incorrect password';
                }
            } else {
                return 'incorrect username';
            }

        },
        isUserExists(username) {
            if (this.usersData.find(some => some.username === username)) {
                return true;
            }
            return false;
        },
        loginUser(userdata) {

            if (this.isUserExists(userdata.username)) {
                let currentUser = this.usersData.find(some => some.username === userdata.username);
                if (userdata.password === currentUser.password) {
                    return { ...currentUser };
                } else {
                    return { id: 0 };
                }

            }
        },
        setUsers(usersdataimport) {
            this.usersData = usersdataimport;
        }
    },
    PUZZLES_STATE: {
        chess_puzzles: [
            {
                id: 1,
                fen: '5B1k/5Q2/4p1p1/5p1p/4P2P/5P2/6K1/8 w - - 0 1',
                solution: ['f7', 'g7'],
                description: 'Мат в 1 ход за белых'
            },
            {
                id: 2,
                fen: 'rnbqkbnr/pppp1ppp/8/4p3/6P1/5P2/PPPPP2P/RNBQKBNR b KQkq - 0 2',
                solution: ['d8', 'h4'],
                description: 'Мат в 1 ход за черных'
            },
            {
                id: 3,
                fen: 'r1bqk2r/pppp1ppp/1bn5/4P3/2BP4/5N2/PP3PPP/RNBQK2R w KQkq - 0 1',
                solution: ['c4', 'f7'],
                description: 'Хорошая жертва'
            },
            {
                id: 4,
                fen: 'rnbqkbnr/ppppp1p1/5p2/7p/8/3BP3/PPPP1PPP/RNBQK1NR w KQkq - 0 1',
                solution: ['a1', 'a1'],
                description: ''
            }
        ],
        lot_puzzles: [
            {
                id: 1,
                fact: "Солнце - звезда",
                isTrue: true,
                explanation: "Солнце действительно является звездой - желтым карликом."
            },
            {
                id: 2,
                fact: "Вода закипает при 90 градусах Цельсия при н.у.",
                isTrue: false,
                explanation: "Вода закипает при 100 градусах Цельсия при нормальном атмосферном давлении."
            },
            {
                id: 3,
                fact: "Пингвины умеют летать",
                isTrue: false,
                explanation: "Пингвины - нелетающие птицы, они хорошо плваают, но не летают."
            },
            {
                id: 4,
                fact: "Python - это язык программирования",
                isTrue: true,
                explanation: "Python - мусор, но всё-таки ЯП, эх."
            },
            {
                id: 5,
                fact: "Земля плоская",
                isTrue: false,
                explanation: "Научно доказано, что Земля имеет форму геоида (сплюснутый у полюсов шар)."
            },
            {
                id: 6,
                fact: "Медвежата при рождении весят около 5 килограммов",
                isTrue: false,
                explanation: "На самом деле, их вес при рождении составляет всего полкило"
            },
            {
                id: 7,
                fact: "Свет быстрее звука",
                isTrue: true,
                explanation: "Свет распространяется со скоростью 300,000 км/с, а звук - около 340 м/с."
            },
            {
                id: 8,
                fact: "Акулы болеют раком",
                isTrue: true,
                explanation: "акулы действительно могут болеть раком."
            },
            {
                id: 9,
                fact: "Венера - самая горячая планета Солнечной системы",
                isTrue: true,
                explanation: "Из-за парникового эффекта температура на Венере достигает 470°C."
            },
            {
                id: 10,
                fact: "Название реки Волга происходит от слова \"волочь\"",
                isTrue: false,
                explanation: "Это неправда, оно происходит от старославянского \"влага\""
            },
            {
                id: 11,
                fact: "Бикини (элемент одежды) было названо в честь дизайнера Альберта Бикини",
                isTrue: false,
                explanation: "Элемент одежды \"бикини\" был назван в честь атолла (острова) Бикини, на котором проходили ядерные испытания"
                //Коралловый остров кольцеобразной формы
            }
        ],
        sudoku_puzzles: {
            puzzles: [
                {
                    id: 1,
                    puzzle: [
                        [1, 2, 0, 4, 5, 6],
                        [4, 5, 6, 1, 2, 3],
                        [2, 0, 1, 5, 0, 4],
                        [0, 6, 0, 0, 3, 0],
                        [3, 4, 5, 6, 1, 2],
                        [6, 1, 2, 3, 4, 5]
                    ]
                },
                {
                    id: 2,
                    puzzle: [
                        [4, 1, 3, 5, 0, 0],
                        [5, 6, 0, 1, 0, 3],
                        [0, 4, 6, 3, 5, 2],
                        [0, 3, 0, 4, 6, 1],
                        [0, 5, 1, 0, 0, 0],
                        [0, 2, 4, 0, 1, 0]
                    ]
                },
                {
                    id: 3,
                    puzzle: [
                        [0, 0, 1, 3, 0, 0],
                        [0, 3, 4, 0, 6, 2],
                        [1, 4, 6, 2, 5, 0],
                        [0, 2, 5, 6, 1, 4],
                        [0, 0, 3, 0, 2, 1],
                        [0, 1, 0, 0, 3, 6],
                    ]
                },
                {
                    id: 4,
                    puzzle: [
                        [0, 0, 0, 1, 5, 0],
                        [6, 1, 5, 3, 0, 0],
                        [0, 0, 0, 5, 0, 0],
                        [1, 0, 0, 2, 6, 3],
                        [3, 2, 6, 4, 0, 5],
                        [5, 0, 0, 6, 0, 2]
                    ]
                },
                {
                    id: 5,
                    puzzla:
                        [
                            [4, 3, 2, 1, 5, 6],
                            [6, 1, 5, 3, 2, 4],
                            [2, 6, 3, 5, 4, 1],
                            [1, 5, 4, 2, 6, 3],
                            [3, 2, 6, 4, 1, 5],
                            [5, 4, 1, 6, 3, 2]
                        ]
                }
            ],
            solutions: [
                {
                    id: 1,
                    puzzle:
                        [
                            [1, 2, 3, 4, 5, 6],
                            [4, 5, 6, 1, 2, 3],
                            [2, 3, 1, 5, 6, 4],
                            [5, 6, 4, 2, 3, 1],
                            [3, 4, 5, 6, 1, 2],
                            [6, 1, 2, 3, 4, 5]
                        ]
                },
                {
                    id: 2,
                    puzzle: [
                        [4, 1, 3, 5, 2, 6],
                        [5, 6, 2, 1, 4, 3],
                        [1, 4, 6, 3, 5, 2],
                        [2, 3, 5, 4, 6, 1],
                        [6, 5, 1, 2, 3, 4],
                        [3, 2, 4, 6, 1, 5]
                    ]
                },
                {
                    id: 4,
                    solution:
                        [
                            [2, 6, 1, 3, 4, 5],
                            [5, 3, 4, 1, 6, 2],
                            [1, 4, 6, 2, 5, 3],
                            [3, 2, 5, 6, 1, 4],
                            [6, 5, 3, 4, 2, 1],
                            [4, 1, 2, 5, 3, 6]
                        ]
                }


            ]
        },
        wordle_puzzles: [
            { id: 1, word: 'МАРКА' },
            { id: 2, word: 'МЕТКА' },
            { id: 3, word: 'КОРКА' },
            { id: 4, word: 'АРБУЗ' },
            { id: 5, word: 'ШКОЛА' },
            { id: 6, word: 'ГОРОД' },
            { id: 7, word: 'ПЧЕЛА' },
            { id: 8, word: 'ОКРУГ' },
            { id: 9, word: 'УЛИЦА' },
            { id: 10, word: 'ЛЕЙКА' },
            { id: 11, word: 'СЦЕНА' },
            { id: 12, word: 'ЧАШКА' },
            { id: 13, word: 'СОЙКА' },
            { id: 14, word: 'ОРГАН' },
            { id: 15, word: 'РОЯЛЬ' },
            { id: 16, word: 'КУСТЫ' },
            { id: 17, word: 'ПАШНЯ' },
            { id: 18, word: 'СОСЕД' },
            { id: 19, word: 'СОСНА' },
            { id: 20, word: 'НОРКА' },
            { id: 21, word: 'ЩЕГОЛ' },
            { id: 22, word: 'ЦЫГАН' },
            { id: 23, word: 'ПАРЧА' },
            { id: 24, word: 'ЭКРАН' },
            { id: 25, word: 'АВРАЛ' },
            { id: 26, word: 'АРКАН' },
            { id: 27, word: 'ПЕВЕЦ' },
            { id: 28, word: 'ЮНОША' },
            { id: 29, word: 'АЗАРТ' },
            { id: 30, word: 'КВАРК' }
        ],
        typing_puzzles: [
            {
                id: 1,
                text: 'Не мысля гордый свет забавить, Вниманье дружбы возлюбя, Хотел бы я тебе представить Залог достойнее тебя, Достойнее души прекрасной, Святой исполненной мечты, Поэзии живой и ясной, Высоких дум и простоты; Но так и быть - рукой пристрастной.'
            },
            {
                id: 2,
                text: 'Во всякой книге предисловие есть первая и вместе с тем последняя вещь; оно или служит объяснением цели сочинения, или оправданием и ответом на критики. Но обыкновенно читателям дела нет до нравственной цели и до журнальных нападок, и потому они не читают предисловий.'
            },
            {
                id: 3,
                text: 'Я ехал на перекладных из Тифлиса. Вся поклажа моей тележки состояла из одного небольшого чемодана, который до половины был набит путевыми записками о Грузии. Большая часть из них, к счастию для вас, потеряна, а чемодан с остальными вещами, к счастью для меня, остался цел.'
            },
            {
                id: 4,
                text: 'Нечего делать, я нанял шесть быков и нескольких осетин. Один из них взвалил себе на плечи мой чемодан, другие стали помогать быкам почти одним криком.'
            },
            {
                id: 5,
                text: 'Нечего делать, я нанял шесть быков и нескольких осетин. Один из них взвалил себе на плечи мой чемодан, другие стали помогать быкам почти одним криком.'
            },
            {
                id: 6,
                text: 'Уж мы различали почтовую станцию, кровли окружающих ее саклей, и перед нами мелькали приветные огоньки, когда пахнул сырой, холодный ветер, ущелье загудело и пошел мелкий дождь. Едва успел я накинуть бурку, как повалил снег. Я с благоговением посмотрел на штабс-капитана...'
            }],
        addChessPuzzle(fenInput, solutionInput, descriptionInput) {
            let some = {
                id: 0,
                fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR - w',
                solution: ['a1', 'a1'],
                description: 'there is no puzzle (to continue: a1 -> a1)'
            }
            if (fenInput !== '' && solutionInput !== '' && descriptionInput !== '') {
                some.id = this.chess_puzzles.length;
                some.fen = fenInput;
                some.solution = solutionInput;
                some.description = descriptionInput;
                this.PUZZLES_STATE.chess_puzzles.push(some);
            }
        },
        getChessPuzzle(id) {
            let chessPuzzlesCopy = [...this.chess_puzzles];
            let result = chessPuzzlesCopy.filter(puzzle => id === Math.ceil(puzzle.id/3));
            return result;
        },
        addLotPuzzle(factInput, istrueInput, explanationInput) {
            let newPuzzle = {
                id: 0,
                fact: '',
                isTrue: false,
                explanation: ''
            }
            if (factInput !== '' && istrueInput !== '' && explanationInput !== '') {
                newPuzzle.id = this.lot_puzzles.length;
                newPuzzle.fact = factInput;
                newPuzzle.isTrue = istrueInput;
                newPuzzle.explanation = explanationInput;
                this.PUZZLES_STATE.lot_puzzles.push(newPuzzle)
            }
        },
        getLotPuzzles(id) {
            let lotPuzzlesCopy = [...this.lot_puzzles];
            let result = lotPuzzlesCopy.filter(puzzle => id === Math.ceil(puzzle.id/3));
            return result;
        },
        addSudokuPuzzle(sudokuInput, solutionInput) {
            let newPuzzle = {
                puzzles: {
                    id: 0,
                    puzzle: [
                        [0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0]
                    ]
                },
                solutions:
                {
                    id: 0,
                    solution: [
                        [0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0]
                    ]
                }
            };
            if (sudokuInput && solutionInput) {
                newPuzzle.puzzles.id = this.sudoku_puzzles.puzzles.length + 1;
                newPuzzle.puzzles.puzzle = sudokuInput;
                newPuzzle.solutions.id = this.sudoku_puzzles.solutions.length + 1;
                newPuzzle.solutions.solution = solutionInput;
                this.sudoku_puzzles.push(newPuzzle)
            }
        },
        getSudokuPuzzle(id) {
            let sudoku = this.sudoku_puzzles.puzzles.find(i => i.id === id);
            let solution = this.sudoku_puzzles.solutions.find(i => i.id === id);
            return {puzzles: sudoku, solutions: solution};
        },
        addWordlePuzzle(word) {
            let newWord = { id: 0, word: '' };
            if (word.length === 5 && !this.PUZZLES_STATE.wordle_puzzles.find(some => some.word.toLowerCase() === word)) {
                newWord.id = this.PUZZLES_STATE.wordle_puzzles.length + 1;
                newWord.word = word;
                this.PUZZLES_STATE.wordle_puzzles.push(newWord);
            }
        },
        getWordlePuzzle(id) {
            return this.wordle_puzzles.find(i => i.id === id);
        },
        addTypingPuzzle(textInput) {
            let newText = { id: 0, text: '' };
            if (textInput.length < 300 && textInput.trim().length > 100) {
                newText.id = this.PUZZLES_STATE.typing_puzzles.length + 1;
                newText.text = textInput;
            }
        },
        getTypingPuzzle(id) {
            return this.typing_puzzles.find(i => i.id === id);
        },
        _getDaysDifference(date1, date2) {
            const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
            const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());

            const diffTime = Math.abs(utc2 - utc1);

            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

            return diffDays;
        },
        getTodayPuzzles(todayDate) {
            let startDate = new Date(2026, 4, 19, 14, 0);
            let someday = new Date(2026, 4, 19, 16, 0);
            let startStr = startDate.toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' });
            console.log(startStr);
            let id = this._getDaysDifference(startDate, someday) + 1;
            console.log(this._getDaysDifference(startDate, someday));
            if (id < 0) {
                return {};
            } else {
                let result = {chess: this.getChessPuzzle(id), lot: this.getLotPuzzles(id), sudoku: this.getSudokuPuzzle(id), wordle: this.getWordlePuzzle(id), typing: this.getTypingPuzzle(id)};
                return result;
            }
        }
    },
    TODAY_PUZZLES: {},
    setTodayPuzzles() {
        this.TODAY_PUZZLES = this.PUZZLES_STATE.getTodayPuzzles(new Date());
    },
    CURRENT_USER: 0,
    dispatch(action) {
        
        //this.PUZZLES_STATE
        this.PUZZLES_STATE.chess_puzzles = chessReducer(this.PUZZLES_STATE.chess_puzzles, action);
        this.PUZZLES_STATE.wordle_puzzles = wordleReducer(this.PUZZLES_STATE.wordle_puzzles, action);
        this.PUZZLES_STATE.sudoku_puzzles = sudokuReducer(this.PUZZLES_STATE.sudoku_puzzles, action);
        this.PUZZLES_STATE.lot_puzzles = lotReducer(this.PUZZLES_STATE.lot_puzzles, action);
        this.PUZZLES_STATE.typing_puzzles = typingReducer(this.PUZZLES_STATE.typing_puzzles, action);
        this.USERS_STATE.usersData = usersReducer(this.USERS_STATE.usersData, action);
        // currentuserReducer.bind(this.USERS_STATE);
        // this.CURRENT_USER = currentuserReducer(this.CURRENT_USER, action);
        if (action.type === 'GET-TODAY-PUZZLES') {
            this.PUZZLES_STATE.getTodayPuzzles.bind(this);
            console.log(this.PUZZLES_STATE.getTodayPuzzles(new Date()));
            return this.PUZZLES_STATE.getTodayPuzzles(new Date());
        }
        let newState = 0;
    if (action.type === LOGIN_USER) {
        // тут я проверяю, есть ли такой пользователь
        if (this.USERS_STATE.isUserExists(action.userdata.username)) {
            
            let currentUser = this.USERS_STATE.usersData.find(some => some.username === action.userdata.username);
            if (action.userdata.password === currentUser.password) {
                newState = action.userdata.userid;
            }
            console.log(this.USERS_STATE.usersData[newState-1]);
        }
        this.CURRENT_USER = newState;
    }
    }
};

export { store };