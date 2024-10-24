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
    active_appeal: IActiveAppeal
    issues: IIssue[]
}

export const getIssuesByName = async (issue_name = ""): Promise<IResult> => {
    return fetch(`/api/issues/?issue_name=${issue_name}`).then(
        (response) => response.json()
    )
}

export const getIssueById = async (id: number): Promise<IIssue> => {
    return fetch(`/api/issues/${id}/`).then(
        (response) => response.json()
    )
}