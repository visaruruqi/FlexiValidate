import IValidationRule from './IValidationRule.ts'

export default class RegexValidationRule implements IValidationRule {
    private errorMessage: string = 'Field is invalid.'
    private regexString: string = '';

    constructor(regex: string) {
        this.regexString = regex
    }

    isValid(param: string): [boolean, string] {
        // added the check param && param.length because we shouldn't validate the empty string
        const isValid = param && param.length ? new RegExp(this.regexString).test(param) : true
        return [isValid, isValid ? '' : this.errorMessage]
    }

    isMatch(type: string): boolean {
        return type.toLowerCase() === 'regex'
    }

    // @ts-ignore
    setParams(params: any): void {
    }

    setErrorMessage(message: string): void {
        this.errorMessage = message
    }

    setRegex(regex: string) {
        this.regexString = regex
    }
}