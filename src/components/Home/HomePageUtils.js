/**
 *  Simulate fetching the json data through asynchronous call
 * @returns {Promise<Array|*>}
 */
export const getCourses = async () => {
        const response = await fetch('data.json');
        const json = await response.json();
        return json.result.courses;
};