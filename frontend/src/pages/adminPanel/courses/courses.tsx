import React, { Fragment } from "react";
import Navbarr from "../../../components/navbar/Navbar";
import { Button, Input } from "@nextui-org/react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { useGetCoursesListQuery } from "../../../store/services/coursesApi";
import { useNavigate } from "react-router-dom";

function CoursesPage() {
  const { data: coursesList } = useGetCoursesListQuery("");

  const navigate = useNavigate();

  return (
    <Fragment>
      <Navbarr />
      <div className="mt-5">
        {/* header */}
        <div className="flex justify-center mb-5 gap-20">
          <Input className="w-1/2" placeholder="Search Courses..." />
          <Button onClick={() => navigate("/addCourse")}>+ Add Course</Button>
        </div>
        {/* body  */}
        <Table aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>NAME</TableColumn>
            <TableColumn>LEVEL</TableColumn>
            <TableColumn>View</TableColumn>
          </TableHeader>
          <TableBody>
            {coursesList &&
              coursesList.courses.map((ele: any) => (
                <TableRow key={ele._id}>
                  <TableCell>{ele.name}</TableCell>
                  <TableCell>{ele.level}</TableCell>
                  <TableCell>View</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </Fragment>
  );
}

export default CoursesPage;
