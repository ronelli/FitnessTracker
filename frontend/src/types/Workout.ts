export interface Workout {
    _id: string,
    workoutType: {
        id: string,
        name:string
    },
    date: string,
    duration: number
}