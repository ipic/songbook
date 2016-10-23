import tableData from './songs.json'

export default class Data {
    constructor() {
        this.rows = tableData;
    }

    _slug(str) {
		str = str.replace(/^\s+|\s+$/g, ''); // trim
		str = str.toLowerCase();

		// remove accents, swap ñ for n, etc
		var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
		var to   = "aaaaeeeeiiiioooouuuunc------";

		for (var i=0, l=from.length ; i<l ; i++)
			str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));

		str = str.replace(/[^a-z0-9 -]/g, '')// remove invalid chars
				.replace(/\s+/g, '-') // collapse whitespace and replace by -
				.replace(/-+/g, '-'); // collapse dashes
		return str;
    }

    search(item) {
        var localItem = item.toUpperCase(),
            result = [];
        this.rows.forEach((row) => {
            console.log(`testing ${row.title} with ${localItem}`);
            if (row.title.indexOf(localItem) !== -1) {
                result.push(row);
            }
        });
        console.log('SEARCH RESULT', result);
        return result;
    }
}
