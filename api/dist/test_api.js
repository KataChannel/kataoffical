const url = "http://localhost:3000/graphql";
const query = {
    query: `query GetNhuCauDatHang($startDate: String!, $endDate: String!) {
    getNhuCauDatHang(startDate: $startDate, endDate: $endDate)
  }`,
    variables: {
        startDate: "2026-04-17",
        endDate: "2026-04-17"
    }
};
async function check() {
    try {
        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(query)
        });
        const r = await res.json();
        if (r.errors) {
            console.error(JSON.stringify(r.errors, null, 2));
            return;
        }
        const item = r.data.getNhuCauDatHang.data.find(i => i.masp === "I100027");
        console.log(JSON.stringify(item, null, 2));
    }
    catch (e) {
        console.error(e);
    }
}
check();
//# sourceMappingURL=test_api.js.map