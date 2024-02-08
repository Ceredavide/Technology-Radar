module.exports = (errors) => {
    const errorsString = errors.reduce((accumulator, error) => {
        return `${accumulator} ${error.path}: ${error.message} \n`;
    }, "\n");

    return errorsString;
}
