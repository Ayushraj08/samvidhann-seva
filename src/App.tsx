import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/config';
import Layout from './components/Layout';
import Home from './pages/Home';
import Learn from './pages/Learn';
import Games from './pages/Games';
import Resources from './pages/Resources';
import Quiz from './pages/games/Quiz';
import TrueFalse from './pages/games/TrueFalse';
import ArticleMatch from './pages/games/ArticleMatch';
import RightsDuties from './pages/games/RightsDuties';
import Team from './pages/Team';
import Contact from './pages/Contact';
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <I18nextProvider i18n={i18n}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/games" element={<Games />} />
          <Route path="/games/quiz" element={<Quiz />} />
          <Route path="/games/true-false" element={<TrueFalse />} />
          <Route path="/games/article-match" element={<ArticleMatch />} />
          <Route path="/games/rights-duties" element={<RightsDuties />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/team" element={<Team />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </I18nextProvider>
  </QueryClientProvider>
);

export default App;
