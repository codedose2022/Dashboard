import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    [theme.breakpoints.between("xs", "md")]: {
      maxWidth: "100%",
    },

    [theme.breakpoints.up("md")]: {
      maxWidth: "90%",
    },
    margin: "0px auto",
    marginTop: theme.spacing(1),
  },
  addButtonStyle: {
    marginTop: theme.spacing(1),
    fontSize: "0.59rem",
    [theme.breakpoints.up("md")]: {
      marginRight: theme.spacing(8),
      marginTop: theme.spacing(8),
    },
    [theme.breakpoints.down("md")]: {
      marginTop: theme.spacing(8),
    },
  },
  tableHeadStyle: {
    fontWeight: "bold",
    fontSize: "0.79rem",
  },
  tableCellStyle: {
    fontSize: "0.7rem",
  },

  selectDropdown: { color: "#fff", backgroundColor: "#1b1f38" },

  toolbar: {
    backgroundColor: "white",
  },
  caption: {
    fontSize: "0.7rem",
  },
  fsModal: {
    top: "3rem !important",
  },
  modalHeader: {
    boxShadow: "0 1px 5px 0px #00000054",
    display: "flex",
    justifyContent: "space-between",
    padding: ".5rem 1rem",
    background: "#eeeeee",
  },
  closeBtn: {
    "&:hover": {
      color: "#d50000",
    },
  },
}));
