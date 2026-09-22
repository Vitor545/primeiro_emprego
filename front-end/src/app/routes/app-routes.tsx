import { Route, Routes } from "react-router"

import { AppLayout } from "@/components/layout/app-layout"
import {
  APP_ROUTES,
  ASSESSMENT_ROUTE,
  GUIDE_ROUTE,
  RESUME_EDITOR_ROUTE,
} from "@/constants/app-routes"
import { AssessmentDetailPage } from "@/pages/assessment-detail/assessment-detail-page"
import { AssessmentsPage } from "@/pages/assessments/assessments-page"
import { DashboardPage } from "@/pages/dashboard/dashboard-page"
import { GuideDetailPage } from "@/pages/guide-detail/guide-detail-page"
import { GuidesPage } from "@/pages/guides/guides-page"
import { HomePage } from "@/pages/home/home-page"
import { NotFoundPage } from "@/pages/not-found/not-found-page"
import { ResumeEditorPage } from "@/pages/resume-editor/resume-editor-page"
import { ResumesPage } from "@/pages/resumes/resumes-page"
import { SignInPage } from "@/pages/sign-in/sign-in-page"
import { SignUpPage } from "@/pages/sign-up/sign-up-page"
import { GuestRoute } from "./guest-route"
import { ProtectedRoute } from "./protected-route"

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path={APP_ROUTES.home} element={<HomePage />} />

        <Route element={<GuestRoute />}>
          <Route path={APP_ROUTES.signIn} element={<SignInPage />} />
          <Route path={APP_ROUTES.signUp} element={<SignUpPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path={APP_ROUTES.dashboard} element={<DashboardPage />} />
          <Route path={APP_ROUTES.resumes} element={<ResumesPage />} />
          <Route path={RESUME_EDITOR_ROUTE} element={<ResumeEditorPage />} />
          <Route path={APP_ROUTES.assessments} element={<AssessmentsPage />} />
          <Route path={ASSESSMENT_ROUTE} element={<AssessmentDetailPage />} />
          <Route path={APP_ROUTES.guides} element={<GuidesPage />} />
          <Route path={GUIDE_ROUTE} element={<GuideDetailPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
