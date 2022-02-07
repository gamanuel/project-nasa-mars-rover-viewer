export interface RoverPhoto {
    camera: {
        full_name: string
        id: number
        name: string
        rover_id: number
    },
    earth_date: string,
    id: number,
    img_src: string,
    rover: {
        id: number,
        landing_date: string,
        launch_date: string,
        name: string,
        status: string
    };
    sol: number;
}