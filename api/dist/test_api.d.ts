declare const url = "http://localhost:3000/graphql";
declare const query: {
    query: string;
    variables: {
        startDate: string;
        endDate: string;
    };
};
declare function check(): Promise<void>;
