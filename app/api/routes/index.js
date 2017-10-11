'use strict';

import character from './character'

const catalog = {
	character
}

export default app => {
	Object.keys(catalog).forEach(k => {
		app.use("/api", catalog[k])
	})
}
