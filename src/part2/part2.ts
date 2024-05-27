import * as R from "ramda";
import { pipe, filter, length } from 'ramda';


const stringToArray = R.split("");

/* Question 1 */
export const countVowels: (text: string) => number = (text: string): number => {
    const characters: string[] = stringToArray(text);
    const vowelChars: string[] = characters.filter(isVowel);
    return vowelChars.length;
}


const isVowel: (char: string) => boolean = (char: string): boolean => {
    const vowels: string = "aeiouAEIOU";
    return vowels.indexOf(char) !== -1;
}


/* Question 2 */
export const isPaired: (text: string) => boolean = (text: string): boolean => {
    const characters: string[] = stringToArray(text);
    // const onlyParan: string[] = characters.filter(isOpening || isClosing);
    const onlyParan: string[] = characters.filter(char => (isOpening(char) || isClosing(char)));
    const stringOfParans: string = onlyParan.reduce((acc: string, curr: string) => 
        acc.concat(curr), "");
    return checkPaired(stringOfParans, []);
}

const isOpening: (char: string) => boolean = (char: string): boolean =>{
    const parentheses: string = "([{";
    return parentheses.indexOf(char) !== -1;
}
const isClosing: (char: string) => boolean = (char: string): boolean =>{
    const parentheses: string = ")]}";
    return parentheses.indexOf(char) !== -1;
}
const matchingOpening: (char: string) => string = (char: string): string => {
    const pairs: { [key: string]: string } = {
        ')' : '(',
        ']' : '[',
        '}' : '{'
    };
    return pairs[char];
}

const checkPaired: (text: string, textArr: string[]) => boolean =
        (text: string, textArr: string[] = []): boolean => {
            return (
                text.length === 0 ?
                (textArr.length === 0 ? true : false) :
                (isOpening(text[0]) ?
                    checkPaired(R.slice(1, Infinity, text), textArr.concat(text[0])) :
                    (textArr.length === 0 || textArr[textArr.length - 1] !== matchingOpening(text[0])) ?
                        false :
                        checkPaired(R.slice(1, Infinity, text), textArr.slice(0, -1)))
            );
            
  }
  

/* Question 3 */
export type WordTree = {
    root: string;
    children: WordTree[];
}

export const treeToSentence : (tree: WordTree) => string = (tree: WordTree) : string => {
    return treeRecursion(tree);
}


const treeRecursion: (tree: WordTree) => string = (tree: WordTree): string => {
    return tree.children.length === 0
        ? tree.root
        : tree.root.concat(" ").concat(arrToString(tree.children.map(treeRecursion)));
}

const arrToString: (array: string[]) => string = (array: string[]): string => {
    return array.reduce((acc: string, curr: string) => acc.concat(" ").concat(curr), "").trim();
}
