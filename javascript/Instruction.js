// JavaScript source code

var rd , rs,rt;
var isImmediateInstruction;
var instructionString;
var opcode;
var immediate;
// BASIC INSTRUCTION FORMATS
//R | opcode | rs | rt | rd | shamt | funct |
//I | opcode | rs | rt |      immediate     |
//J | opcode |           address            |

function basicInstructionFormats(op) {//op = operation for explanple add,sub etc.
    var switcher;//returns the type of instruction
    if (op.equals("ADD") || op.equals("SUB") || op.equals("MULT") || op.equals("DIV") || op.equals("AND")
        || op.equals("OR") || op.equals("XOR") || op.equals("SLL") || op.equals("SRL") || op.equals("SLT")
        || op.equals("SLE") || op.equals("SGT") || op.equals("SGE") || op.equals("SEQ"))
        return switcher = 0;  // R-type instructions
    else if (op.equals("ADDI") || op.equals("ANDI") || op.equals("ORI") || op.equals("XORI")
             || op.equals("SUBI") || op.equals("SLLI") || op.equals("SRLI"))
        return switcher = 1;  // I-type instructions
    else if (op.equals("LW") || op.equals("SW"))
        return switcher = 2;  // load/store word instructions
    else if (op.equals("BEQ") || op.equals("BNE"))
        return switcher = 3;  // branch instructions
    else alert("INSTRUCTION NOT FOUND :(")
    }

function opcodeInstructionR(op) {
    if (op.equals("ADD"))
        this.opcode = 32;        
    else if (op.equals("SUB"))
        this.opcode = 34;
    else if (op.equals("MULT"))
        this.opcode = 24;
    else if (op.equals("DIV"))
        this.opcode = 26;
    else if (op.equals("AND"))
        this.opcode = 36;
    else if (op.equals("XOR"))
        this.opcode = 38;
    else if (op.equals("SLL"))
        this.opcode = 50;
    else if (op.equals("SRL"))
        this.opcode = 51;
    else if (op.equals("SLT"))
        this.opcode = 60;
    else if (op.equals("SLE"))
        this.opcode = 61;
    else if (op.equals("SEQ"))
        this.opcode = 62;
    else if (op.equals("SGT"))
        this.opcode = 63;
    else if (op.equals("SGE"))
        this.opcode = 64;
    else
        this.opcode = 37; // OR is the only one left
}


function opcodeInstructionI(op) {
    if (op.equals("ADDI"))
        this.opcode = 32;
    else if (op.equals("ANDI"))
        this.opcode = 36;
    else if (op.equals("SUBI"))
        this.opcode = 34;
    else if (op.equals("XORI"))
        this.opcode = 38;
    else if (op.equals("SLLI"))
        this.opcode = 50;
    else if (op.equals("SRLI"))
        this.opcode = 51;
    else
        this.opcode = 37; // ORI is the only one left
}



function Instruction(instruction) {
    var operation="", registers, t1="", t2="", t3="";
    var values;
    // initial operand values
    this.rd = 0;
    this.rs = 0;
    this.rt = 0;
    // assumes no immediate operand
    this.isImmediateInstruction = false
    // example add $t1,$t2,t3
    this.instructionString = instruction.split(" ")

    operation = instructionString[0] //save add
    registers = instructionString[1] //save $t1,$t2,t3

    values = registers.split(",")

    t1 = values[0] //save $t1 
    t2 = values[1] //save $t2
    t3 = values[2] //save $t3

    // if not operation instruction
    if (instruction.equals("NOP")) {
        instructionString = "NOP";
        rd = 0;
        rt = 0;
        rs = 0;
        immediate = 0;
        opcode = 0;
        return;
    }   
     var s = "hoa"
    
    switch (basicInstructionFormats(operation)) {
        case 0:
            //example add $t1,$t2,$t3
            this.rd = t1.substring(1);
            this.rs = t2.substring(1);
            this.rt = t3.substring(1);
            if (rt < 0 || rt > 31 || rs < 0 || rs > 31 || rd < 1 || rd > 31) {
                alert("Invalid Instr: register out of bounds");
            }
            opcodeInstructionR(operation);
            break;

        case 1:
            //example addi $t1,$t2,1
            this.rd = t1.substring(1);
            this.rs = t2.substring(1);
            if (rd < 1 || rd > 31 || rs < 0 || rs > 31) {
                alert("Invalid Instr: register out of bounds");
            }
            this.isImmediateInstruction = true;
            immediate = t3;
            opcodeInstructionI(operation);
            break;
        default:

    }

    




}