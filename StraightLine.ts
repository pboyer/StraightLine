export class Interpreter {	
	env : Env;
	
	constructor(){
		this.env = new Env();
	}
	
	evalStm(s : Stm) : void {
		if (s instanceof PrintStm){
			console.log( this.evalExpList(s.exps) );
		} else if (s instanceof CompoundStm){
			this.evalStm(s.stm1);
			this.evalStm(s.stm2);
		} else if (s instanceof AssignStm){
			var st : AssignStm = s;
			this.env[st.id] = this.evalExp(st.exp);
		}
	}

	evalExp(e : Exp) : number {
		if (e instanceof IdExp){
			return this.env[e.id];
		} else if (e instanceof NumExp) {
			return e.num;
		} else if (e instanceof OpExp) {
			return this.evalOpExp( e );
		} else if (e instanceof EseqExp) {
			this.evalStm( e.stm );
			return this.evalExp( e.exp );
		}
	}
	
	evalOpExp(e : OpExp) : number {
		switch (e.op){
			case Op.Add:
				return this.evalExp(e.lhs) + this.evalExp(e.rhs);
			case Op.Subtract:
				return this.evalExp(e.lhs) - this.evalExp(e.rhs);
			case Op.Multiply:
				return this.evalExp(e.lhs) * this.evalExp(e.rhs);
		}
	}
	
	evalExpList(e : ExpList) : number[] {
		if (e instanceof PairExpList){
			return [ this.evalExp( e.head ) ].concat( this.evalExpList(e.tail) );
		} else if (e instanceof LastExpList){
			return [ this.evalExp( e.head ) ];
		}
	}
}

export class Env {
	[id : string] : number;
}

export class Stm {}

export class CompoundStm implements Stm {
	stm1 : Stm;
	stm2 : Stm;
	constructor(s1 : Stm, s2 : Stm){
		this.stm1 = s1;
		this.stm2 = s2;
	}
}

export class AssignStm implements Stm {
	id : string;
	exp : Exp;
	constructor(i : string, e : Exp){
		this.id = i;
		this.exp = e;
	}
} 

export class PrintStm implements Stm {
	exps : ExpList;
	constructor(e : ExpList){
		this.exps = e;
	}
}

export class Exp {}

export class IdExp implements Exp {
	id : string;
	constructor(i : string){
		this.id = i;
	}
}

export class NumExp implements Exp {
	num : number;
	constructor(n : number){
		this.num = n;
	}	
}

export enum Op {
	Add, Subtract, Multiply
}

export class OpExp implements Exp {
	lhs : Exp;
	rhs : Exp;
	op : Op;
	constructor(l : Exp,r : Exp,o : Op){
		this.lhs = l;
		this.rhs = r;
		this.op = o;
	}
}

export class EseqExp implements Exp {
	stm : Stm;
	exp : Exp;
	constructor(s : Stm, e : Exp){
		this.stm = s;
		this.exp = e;
	}
}

export class ExpList {}

export class PairExpList implements ExpList {
	head : Exp;
	tail : ExpList;
	constructor(h : Exp, t : ExpList){ 
		this.head = h;
		this.tail = t;
	}
}

export class LastExpList implements ExpList {
	head : Exp;
	constructor(h : Exp){
		this.head = h;
	}
}
