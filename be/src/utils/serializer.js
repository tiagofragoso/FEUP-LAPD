const filterKeys = (object, keys) =>
    Object.keys(object).filter((k) => keys.includes(k)).reduce(
        (acc, curr) => (
            {
                ...acc,
                [curr]: object[curr],
            }
        ),
        {});

module.exports = { filterKeys };
