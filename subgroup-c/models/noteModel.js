const today = new Date();

const stringDate = today.toDateString();

const notes = [
    {
        id: 1,
        date: "Fri 27 July 2026",
        title: "Ingredients for cake making",
        body: "Flour, egg, butter, sugar, water."
    }
];

module.exports = {
    notes,
    stringDate
};