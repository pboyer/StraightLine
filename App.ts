/// <reference path="typings/node/node.d.ts" />
import assert = require("assert");

import S = require("./StraightLine");

(() => {
	var i = new S.Interpreter();
	
	i.evalStm(new S.AssignStm(
		"foo",
		new S.NumExp(3)
		));
		
	assert.equal(i.env["foo"], 3);
})();

