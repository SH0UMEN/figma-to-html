class HtmlWriter {
	static writeAttributes(attributes: Map<string, string>) {
		let result = '';

		for(let key of attributes.keys())
			result += ' ' + key + '="' + attributes.get(key) + '"';

		return result;
	}

	static writeStyle(styles: Map<string, string>) {
		let css = '';

		for(let key of styles.keys())
			if(styles.get(key) != '')
				css += key + ':' + styles.get(key) + ';';

		return css;
	}

	static writeElement(tag: string, attributes: Map<string, string>, html?: string) {
		return '<' + tag + HtmlWriter.writeAttributes(attributes) + '>' + (html || '') + '</' + tag + '>';
	}
}

export default HtmlWriter;