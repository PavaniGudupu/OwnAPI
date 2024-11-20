import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const masterKey = "Uj5vYSa#9WhnKg@";


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");

// Get a random book
app.get("/random", (req, res) => {
    const randomIndex = Math.floor(Math.random() * data.length);
    res.json(data[randomIndex]);
});

// Get a book by ID
app.get("/books/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const foundBook = data.find((book) => book.book_id === id);
    if (foundBook) {
        res.json(foundBook);
    } else {
        res.status(404).json({ error: "Book not found." });
    }
});

// Filter books by query
app.get("/filter", (req, res) => {
    const id = req.query.id;
    const filteredBooks = data.filter((book) => book.book_id.toString() === id);
    if (filteredBooks.length > 0) {
        res.json(filteredBooks);
    } else {
        res.status(404).json({ error: "No matching book found." });
    }
});

// Add a new book
app.post("/books", (req, res) => {
    const newBook = {
        book_id: data.length + 1,
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        published_year: req.body.published_year,
        rating: req.body.rating,
        synopsis: req.body.synopsis
    };
    data.push(newBook);
    res.json(newBook);
});

// Update a book (full replacement)
app.put("/books/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = data.findIndex((book) => book.book_id === id);
    if (index !== -1) {
        const updatedBook = {
            book_id: id,
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            published_year: req.body.published_year,
            rating: req.body.rating,
            synopsis: req.body.synopsis
        };
        data[index] = updatedBook;
        res.json(updatedBook);
    } else {
        res.status(404).json({ error: "Book not found." });
    }
});

// Update a book (partial update)
app.patch("/books/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = data.findIndex((book) => book.book_id === id);
    if (index !== -1) {
        const existingBook = data[index];
        const updatedBook = {
            ...existingBook,
            title: req.body.title || existingBook.title,
            author: req.body.author || existingBook.author,
            genre: req.body.genre || existingBook.genre,
            published_year: req.body.published_year || existingBook.published_year,
            rating: req.body.rating || existingBook.rating,
            synopsis: req.body.synopsis || existingBook.synopsis
        };
        data[index] = updatedBook;
        res.json(updatedBook);
    } else {
        res.status(404).json({ error: "Book not found." });
    }
});

// Delete a book by ID
app.delete("/books/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = data.findIndex((book) => book.book_id === id);
    if (index !== -1) {
        data.splice(index, 1);
        res.status(200).json({ message: "Book deleted successfully." });
    } else {
        res.status(404).json({ error: "Book not found." });
    }
});

// Delete all books (requires master key)
app.delete("/all", (req, res) => {
    const userKey = req.query.key;
    if (userKey === masterKey) {
        while (data.length > 0) {
            data.pop();
        }
        res.status(200).json({ message: "All books deleted successfully." });
    } else {
        res.status(403).json({ error: "You are not authorized to perform this action." });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}...`);
});



const data = [
    {
        "book_id": 1,
        "title": "The Great Gatsby",
        "author": "F. Scott Fitzgerald",
        "genre": "Classic",
        "published_year": 1925,
        "rating": 4.4,
        "synopsis": "A story of the mysteriously wealthy Jay Gatsby and his love for Daisy Buchanan, set in the Jazz Age."
    },
    {
        "book_id": 2,
        "title": "To Kill a Mockingbird",
        "author": "Harper Lee",
        "genre": "Fiction",
        "published_year": 1960,
        "rating": 4.8,
        "synopsis": "A profound story of racial injustice in the Deep South, narrated by a young girl named Scout Finch."
    },
    {
        "book_id": 3,
        "title": "1984",
        "author": "George Orwell",
        "genre": "Dystopian",
        "published_year": 1949,
        "rating": 4.6,
        "synopsis": "A chilling depiction of a totalitarian regime and its impact on freedom and individuality."
    },
    {
        "book_id": 4,
        "title": "The Alchemist",
        "author": "Paulo Coelho",
        "genre": "Philosophy",
        "published_year": 1988,
        "rating": 4.3,
        "synopsis": "A young shepherd's journey in search of his Personal Legend and the meaning of life."
    },
    {
        "book_id": 5,
        "title": "Pride and Prejudice",
        "author": "Jane Austen",
        "genre": "Classic",
        "published_year": 1813,
        "rating": 4.5,
        "synopsis": "The romantic clashes between Elizabeth Bennet and the enigmatic Mr. Darcy in 19th-century England."
    },
    {
        "book_id": 6,
        "title": "Moby Dick",
        "author": "Herman Melville",
        "genre": "Adventure",
        "published_year": 1851,
        "rating": 4.1,
        "synopsis": "The epic tale of Captain Ahab's obsessive quest to hunt the white whale, Moby Dick."
    },
    {
        "book_id": 7,
        "title": "War and Peace",
        "author": "Leo Tolstoy",
        "genre": "Historical",
        "published_year": 1869,
        "rating": 4.6,
        "synopsis": "A sweeping novel about love, war, and society during the Napoleonic era in Russia."
    },
    {
        "book_id": 8,
        "title": "Crime and Punishment",
        "author": "Fyodor Dostoevsky",
        "genre": "Psychological",
        "published_year": 1866,
        "rating": 4.7,
        "synopsis": "The story of a young student who commits a crime and struggles with guilt and morality."
    },
    {
        "book_id": 9,
        "title": "Jane Eyre",
        "author": "Charlotte Brontë",
        "genre": "Classic",
        "published_year": 1847,
        "rating": 4.4,
        "synopsis": "An orphaned governess's struggles and triumphs, including her love for Mr. Rochester."
    },
    {
        "book_id": 10,
        "title": "The Catcher in the Rye",
        "author": "J.D. Salinger",
        "genre": "Fiction",
        "published_year": 1951,
        "rating": 4.2,
        "synopsis": "The iconic tale of teenage rebellion and angst, told through the eyes of Holden Caulfield."
    },
    {
        "book_id": 11,
        "title": "The Hobbit",
        "author": "J.R.R. Tolkien",
        "genre": "Fantasy",
        "published_year": 1937,
        "rating": 4.8,
        "synopsis": "Bilbo Baggins's unexpected journey to reclaim a treasure guarded by the dragon Smaug."
    },
    {
        "book_id": 12,
        "title": "Anna Karenina",
        "author": "Leo Tolstoy",
        "genre": "Drama",
        "published_year": 1877,
        "rating": 4.6,
        "synopsis": "A tragic tale of love, infidelity, and societal expectations in 19th-century Russia."
    },
    {
        "book_id": 13,
        "title": "Brave New World",
        "author": "Aldous Huxley",
        "genre": "Dystopian",
        "published_year": 1932,
        "rating": 4.3,
        "synopsis": "A chilling vision of a future society driven by technology and the suppression of individuality."
    },
    {
        "book_id": 14,
        "title": "Les Misérables",
        "author": "Victor Hugo",
        "genre": "Historical",
        "published_year": 1862,
        "rating": 4.7,
        "synopsis": "The timeless story of justice, redemption, and love in revolutionary France."
    },
    {
        "book_id": 15,
        "title": "Wuthering Heights",
        "author": "Emily Brontë",
        "genre": "Gothic",
        "published_year": 1847,
        "rating": 4.5,
        "synopsis": "A dark tale of love, revenge, and the haunting moors of Yorkshire."
    },
    {
        "book_id": 16,
        "title": "Great Expectations",
        "author": "Charles Dickens",
        "genre": "Classic",
        "published_year": 1861,
        "rating": 4.4,
        "synopsis": "The journey of an orphan named Pip, who dreams of becoming a gentleman."
    },
    {
        "book_id": 17,
        "title": "Don Quixote",
        "author": "Miguel de Cervantes",
        "genre": "Adventure",
        "published_year": 1605,
        "rating": 4.3,
        "synopsis": "The comedic exploits of a nobleman who imagines himself a knight-errant."
    },
    {
        "book_id": 18,
        "title": "Frankenstein",
        "author": "Mary Shelley",
        "genre": "Horror",
        "published_year": 1818,
        "rating": 4.5,
        "synopsis": "The chilling tale of Victor Frankenstein and the creature he brings to life."
    },
    {
        "book_id": 19,
        "title": "The Odyssey",
        "author": "Homer",
        "genre": "Epic",
        "published_year": -700,
        "rating": 4.6,
        "synopsis": "The legendary tale of Odysseus's perilous journey home after the Trojan War."
    },
    {
        "book_id": 20,
        "title": "Dracula",
        "author": "Bram Stoker",
        "genre": "Horror",
        "published_year": 1897,
        "rating": 4.3,
        "synopsis": "The iconic Gothic tale of Count Dracula and his quest for blood."
    },
    {
        "book_id": 21,
        "title": "The Divine Comedy",
        "author": "Dante Alighieri",
        "genre": "Epic",
        "published_year": 1320,
        "rating": 4.7,
        "synopsis": "A poetic journey through Hell, Purgatory, and Paradise."
    },
    {
        "book_id": 22,
        "title": "Fahrenheit 451",
        "author": "Ray Bradbury",
        "genre": "Dystopian",
        "published_year": 1953,
        "rating": 4.5,
        "synopsis": "A future where books are banned, and 'firemen' burn them to suppress dissent."
    },
    {
        "book_id": 23,
        "title": "The Iliad",
        "author": "Homer",
        "genre": "Epic",
        "published_year": -750,
        "rating": 4.4,
        "synopsis": "The epic story of the Trojan War and the wrath of Achilles."
    },
    {
        "book_id": 24,
        "title": "The Picture of Dorian Gray",
        "author": "Oscar Wilde",
        "genre": "Philosophy",
        "published_year": 1890,
        "rating": 4.4,
        "synopsis": "A philosophical tale about morality, art, and the pursuit of eternal youth."
    },
    {
        "book_id": 25,
        "title": "The Brothers Karamazov",
        "author": "Fyodor Dostoevsky",
        "genre": "Philosophy",
        "published_year": 1880,
        "rating": 4.8,
        "synopsis": "A deep exploration of faith, morality, and family through the lives of three brothers."
    }
];
