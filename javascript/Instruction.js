// JavaScript source code



var rdValue, rtValue, rsValue;
var isImmediateInstruction;
var instructionString;

// BASIC INSTRUCTION FORMATS
//R | opcode | rs | rt | rd | shamt | funct |
//I | opcode | rs | rt |      immediate     |
//J | opcode |           address            |

function basicInstructionFormats(op) {//op = operation for explanple add,sub etc.
    var switcher;//returns the type of instruction
    if (op.equals("ADD") || op.equals("SUB") || op.equals("MULT") || op.equals("DIV") || op.equals("AND") || op.equals("OR") || op.equals("XOR") || op.equals("SLL")
        || op.equals("SRL") || op.equals("SLT") || op.equals("SLE") || op.equals("SGT") || op.equals("SGE") || op.equals("SEQ"))
        return switcher = 0;  // R-type instructions
    else if (op.equals("ADDI") || op.equals("ANDI") || op.equals("ORI") || op.equals("XORI") || op.equals("SUBI") || op.equals("SLLI") || op.equals("SRLI"))
        return switcher = 1;  // I-type instructions
    else if (op.equals("LW") || op.equals("SW"))
        return switcher = 2;  // load/store word instructions
    else if (op.equals("BEQ") || op.equals("BNE"))
        return switcher = 3;  // branch instructions
    }

function Instruction(instruction) {
    var operation = "", register1 = "", register1 = "", register1 ="" ;
    // initial operand values
    rdValue = 0
    rsValue = 0
    rtValue = 0
    // assumes no immediate operand
    isImmediateInstruction = false
    instructionString = instruction




}