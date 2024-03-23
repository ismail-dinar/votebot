export interface UserVote {
    user: {
        id: string,
        displayName: string,
    },
    choice: {
        game: number,
        text: string,
    }
}