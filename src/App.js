import { Routes, Route, Navigate } from 'react-router-dom'
// import { useContext, useEffect } from 'react'
// import { authContext } from './store/authContext'

import Navbar from './components/Navbar'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

import Student from './pages/student/Student'
import StudentApplyOutpass from './pages/student/ApplyOutpass'
import StudentOutpassHistory from './pages/student/OutpassHistory'
import ViewOutpass from './pages/student/ViewOutpass'

import FacultyAdvisor from './pages/faculty-advisor/FacultyAdvisor'
import FacultyAdvisorOutpassHistory from './pages/faculty-advisor/OutpassHistory'
import FacultyAdvisorPendingOutpasses from './pages/faculty-advisor/PendingOutpasses'
import FacultyAdvisorOutpass from './pages/faculty-advisor/Outpass'
import FacultyAdvisorMentees from './pages/faculty-advisor/Mentees'

import Warden from './pages/warden/Warden'
import WardenOutpassHistory from './pages/warden/OutpassHistory'
import WardenPendingOutpasses from './pages/warden/PendingOutpasses'
import WardenOutpass from './pages/warden/Outpass'
import WardenStudents from './pages/warden/Students'

import SLC from './pages/slc/SLC'
import SLCOutpassHistory from './pages/slc/OutpassHistory'
import SLCPendingOutpasses from './pages/slc/PendingOutpasses'
import SLCOutpass from './pages/slc/Outpass'
import SLCStudents from './pages/slc/Students'
import SLCManage from './pages/slc/Manage'
import SLCManageStudents from './pages/slc/manage/Students'
import SLCManageFacultyAdvisors from './pages/slc/manage/FacultyAdvisors'
import SLCManageWardens from './pages/slc/manage/Wardens'
import SLCManageStudentsAdd from './pages/slc/manage/AddStudents'
import SLCManageStudentsEdit from './pages/slc/manage/EditStudents'
import SLCManageFacultyAdvisorsAdd from './pages/slc/manage/AddFacultyAdvisor'
import SLCManageFacultyAdvisorsEdit from './pages/slc/manage/EditFacultyAdvisor'
import SLCManageWardensAdd from './pages/slc/manage/AddWarden'
import SLCManageWardensEdit from './pages/slc/manage/EditWarden'

function App() {
  // const {  } = useContext(authContext)

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        <Route path='/student' element={<Student />} />
        <Route
          path='/student/apply-outpass'
          element={<StudentApplyOutpass />}
        />
        <Route
          path='/student/outpass-history'
          element={<StudentOutpassHistory />}
        />
        <Route path='/student/outpass/:id' element={<ViewOutpass />} />

        <Route path='/faculty-advisor' element={<FacultyAdvisor />} />
        <Route
          path='/faculty-advisor/outpass-history'
          element={<FacultyAdvisorOutpassHistory />}
        />
        <Route
          path='/faculty-advisor/pending-outpasses'
          element={<FacultyAdvisorPendingOutpasses />}
        />
        <Route
          path='/faculty-advisor/outpass/:id'
          element={<FacultyAdvisorOutpass />}
        />
        <Route
          path='/faculty-advisor/mentees'
          element={<FacultyAdvisorMentees />}
        />

        <Route path='/warden' element={<Warden />} />
        <Route
          path='/warden/outpass-history'
          element={<WardenOutpassHistory />}
        />
        <Route
          path='/warden/pending-outpasses'
          element={<WardenPendingOutpasses />}
        />
        <Route path='/warden/outpass/:id' element={<WardenOutpass />} />
        <Route path='/warden/students' element={<WardenStudents />} />

        <Route path='/slc' element={<SLC />} />
        <Route path='/slc/outpass-history' element={<SLCOutpassHistory />} />
        <Route
          path='/slc/pending-outpasses'
          element={<SLCPendingOutpasses />}
        />
        <Route path='/slc/outpass/:id' element={<SLCOutpass />} />
        <Route path='/slc/students' element={<SLCStudents />} />
        <Route path='/slc/manage' element={<SLCManage />} />
        <Route path='/slc/manage/students' element={<SLCManageStudents />} />
        <Route
          path='/slc/manage/faculty-advisors'
          element={<SLCManageFacultyAdvisors />}
        />
        <Route path='/slc/manage/wardens' element={<SLCManageWardens />} />
        <Route
          path='/slc/manage/students/add'
          element={<SLCManageStudentsAdd />}
        />
        <Route
          path='/slc/manage/students/edit/:id'
          element={<SLCManageStudentsEdit />}
        />
        <Route
          path='/slc/manage/faculty-advisors/add'
          element={<SLCManageFacultyAdvisorsAdd />}
        />
        <Route
          path='/slc/manage/faculty-advisors/edit/:id'
          element={<SLCManageFacultyAdvisorsEdit />}
        />
        <Route
          path='/slc/manage/wardens/add'
          element={<SLCManageWardensAdd />}
        />
        <Route
          path='/slc/manage/wardens/edit/:id'
          element={<SLCManageWardensEdit />}
        />

        <Route path='/*' element={<Navigate to={'/'} />} />
      </Routes>
    </>
  )
}

export default App
