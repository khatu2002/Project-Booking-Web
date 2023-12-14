import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const List = () => {
  const rows = [
    {
      id: 1143155,
      product: "Hotel California New",
      img: "https://loscabosmexicoblog.com/wp-content/uploads/2016/04/Hotel-California-los-cabos.jpg",
      customer: "Thuy Duong",
      date: "4 December",
      amount: 785,
      method: "Cash",
      status: "Approved",
    },
    {
      id: 2235235,
      product: "Hotel Jan",
      img: "https://media-cdn.tripadvisor.com/media/photo-s/05/ef/80/12/hotel-majestic-saigon.jpg",
      customer: "Emily Cooper",
      date: "25 November",
      amount: 900,
      method: "Online Payment",
      status: "Pending",
    },
    {
      id: 2342353,
      product: "Hotel Minik",
      img: "https://artishotel.vn/wp-content/uploads/2021/12/artishotel.png",
      customer: "London Tipton",
      date: "19 November",
      amount: 600,
      method: "Cash",
      status: "Pending",
    },
    {
      id: 2357741,
      product: "AOV Hotel",
      img: "https://assets-global.website-files.com/619bb38c7dfe56fa47a49885/62655bc2660394946e065b2f_cohost-vn-khach-san-la-gi-12.png",
      customer: "IU",
      date: "12 November",
      amount: 920,
      method: "Online Payment",
      status: "Approved",
    },
    {
      id: 2342355,
      product: "Hotel Jolly",
      img: "https://the-luxe-hotel-ho-chi-minh-city.hotelmix.vn/data/Photos/OriginalPhoto/12606/1260677/1260677746/The-Luxe-Hotel-Ho-Chi-Minh-City-Exterior.JPEG",
      customer: "Kha Tu",
      date: "30 October",
      amount: 2000,
      method: "Online Payment",
      status: "Pending",
    },
  ];
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell"><b>Payment ID</b></TableCell>
            <TableCell className="tableCell"><b>Hotel</b></TableCell>
            <TableCell className="tableCell"><b>Customer</b></TableCell>
            <TableCell className="tableCell"><b>Date</b></TableCell>
            <TableCell className="tableCell"><b>Amount</b></TableCell>
            <TableCell className="tableCell"><b>Payment Method</b></TableCell>
            <TableCell className="tableCell"><b>Status</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">{row.id}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={row.img} alt="" className="image" />
                  {row.product}
                </div>
              </TableCell>
              <TableCell className="tableCell">{row.customer}</TableCell>
              <TableCell className="tableCell">{row.date}</TableCell>
              <TableCell className="tableCell">{row.amount}</TableCell>
              <TableCell className="tableCell">{row.method}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${row.status}`}>{row.status}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;