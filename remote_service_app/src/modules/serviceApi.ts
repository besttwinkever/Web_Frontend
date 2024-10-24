export interface IIssue {
    id: number
    name: string
    description: string
    image: string
}

export interface IActiveAppeal {
    id: number
    count: number
}

export interface IResult {
    activeAppeal: IActiveAppeal
    issues: IIssue[]
}

export const getIssuesByName = async (issue_name = ""): Promise<IResult> => {
    return fetch(`http://localhost:8000/issues/?issue_name=${issue_name}`).then(
        (response) => response.json()
    )
}