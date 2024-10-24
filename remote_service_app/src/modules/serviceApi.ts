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

export const getIssuesByName = async (name = ""): Promise<IResult> => {
    return fetch(`http://localhost:8000/issues/?name=${name}`).then(
        (response) => response.json()
    )
}