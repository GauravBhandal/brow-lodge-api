/**
 * For nested data it will iterate the array and convert it to string
 * @param {array} listOfStrings - contains array of string 
 */
export const convertArrayToString = (listOfStrings: string[]) => {
    const value = listOfStrings.reduce((prevVal, curVal, index) => {
        return index === 0
            ? curVal
            : `${prevVal}, ${curVal}`;
    }, "");
}
