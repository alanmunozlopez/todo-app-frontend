import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import TaskList from '../TaskList';
import { theme } from '../../theme';
import type { Task } from '../../types/Task';

const mockTasks: Task[] = [
  {
    id: 1,
    name: "Pending Task",
    dueDate: "2024-12-31T00:00:00.000Z",
    priority: 3,
    createdAt: "2024-12-01T10:00:00.000Z",
    updatedAt: "2024-12-01T10:00:00.000Z",
    isOverdue: false,
  },
  {
    id: 2,
    name: "Overdue Task",
    dueDate: "2024-01-01T00:00:00.000Z",
    priority: 5,
    createdAt: "2024-01-01T10:00:00.000Z",
    updatedAt: "2024-01-01T10:00:00.000Z",
    isOverdue: true,
  },
];

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('TaskList', () => {
  const mockProps = {
    tasks: mockTasks,
    loading: false,
    filter: 'all' as const,
    onFilterChange: vi.fn(),
    onAddTask: vi.fn(),
    onEditTask: vi.fn(),
    onDeleteTask: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders task list correctly', () => {
    renderWithTheme(<TaskList {...mockProps} />);

    expect(screen.getByText('My Tasks')).toBeInTheDocument();
    expect(screen.getByText('Pending Task')).toBeInTheDocument();
    expect(screen.getByText('Overdue Task')).toBeInTheDocument();
  });

  it('shows loading state', () => {
    renderWithTheme(<TaskList {...mockProps} loading={true} />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('shows empty state when no tasks', () => {
    renderWithTheme(<TaskList {...mockProps} tasks={[]} />);

    expect(screen.getByText('No tasks found')).toBeInTheDocument();
    expect(screen.getByText('Create your first task to get started')).toBeInTheDocument();
  });

  it('filters tasks correctly', () => {
    renderWithTheme(<TaskList {...mockProps} filter="pending" />);

    expect(screen.getByText('Pending Task')).toBeInTheDocument();
    expect(screen.queryByText('Overdue Task')).not.toBeInTheDocument();
  });

  it('calls onAddTask when add button is clicked', () => {
    renderWithTheme(<TaskList {...mockProps} />);

    const addButton = screen.getByRole('button', { name: /add task/i });
    fireEvent.click(addButton);

    expect(mockProps.onAddTask).toHaveBeenCalled();
  });

  it('handles filter changes', () => {
    renderWithTheme(<TaskList {...mockProps} />);

    const pendingButton = screen.getByRole('button', { name: /pending/i });
    fireEvent.click(pendingButton);

    expect(mockProps.onFilterChange).toHaveBeenCalledWith('pending');
  });

  it('shows correct empty state for filtered results', () => {
    renderWithTheme(<TaskList {...mockProps} tasks={[]} filter="overdue" />);

    expect(screen.getByText('No tasks found')).toBeInTheDocument();
    expect(screen.getByText('No overdue tasks')).toBeInTheDocument();
  });
});