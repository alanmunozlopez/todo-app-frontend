import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import TaskItem from '../TaskItem';
import { theme } from '../../theme';
import type { Task } from '../../types/Task';

const mockTask: Task = {
  id: 1,
  name: "Test Task",
  dueDate: "2024-12-31T00:00:00.000Z",
  priority: 3,
  createdAt: "2024-12-01T10:00:00.000Z",
  updatedAt: "2024-12-01T10:00:00.000Z",
  isOverdue: false,
};

const mockOverdueTask: Task = {
  ...mockTask,
  id: 2,
  name: "Overdue Task",
  isOverdue: true,
};

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('TaskItem', () => {
  const mockOnEdit = vi.fn();
  const mockOnDelete = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders task information correctly', () => {
    renderWithTheme(
      <TaskItem task={mockTask} onEdit={mockOnEdit} onDelete={mockOnDelete} />
    );

    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText(/Dec 31, 2024/)).toBeInTheDocument();
    expect(screen.getByText('Medium')).toBeInTheDocument();
  });

  it('shows overdue styling for overdue tasks', () => {
    renderWithTheme(
      <TaskItem task={mockOverdueTask} onEdit={mockOnEdit} onDelete={mockOnDelete} />
    );

    expect(screen.getByText('This task is overdue')).toBeInTheDocument();
    expect(screen.getByText('Overdue Task')).toBeInTheDocument();
  });

  it('calls onEdit when edit button is clicked', () => {
    renderWithTheme(
      <TaskItem task={mockTask} onEdit={mockOnEdit} onDelete={mockOnDelete} />
    );

    const editButton = screen.getByTestId('EditIcon').closest('button');
    fireEvent.click(editButton!);

    expect(mockOnEdit).toHaveBeenCalledWith(mockTask);
  });

  it('calls onDelete when delete button is clicked', () => {
    renderWithTheme(
      <TaskItem task={mockTask} onEdit={mockOnEdit} onDelete={mockOnDelete} />
    );

    const deleteButton = screen.getByTestId('DeleteIcon').closest('button');
    fireEvent.click(deleteButton!);

    expect(mockOnDelete).toHaveBeenCalledWith(mockTask.id);
  });

  it('displays correct priority labels', () => {
    const priorities = [
      { priority: 1, label: 'Very Low' },
      { priority: 2, label: 'Low' },
      { priority: 3, label: 'Medium' },
      { priority: 4, label: 'High' },
      { priority: 5, label: 'Critical' },
    ];

    priorities.forEach(({ priority, label }) => {
      const task = { ...mockTask, priority };
      const { unmount } = renderWithTheme(
        <TaskItem task={task} onEdit={mockOnEdit} onDelete={mockOnDelete} />
      );

      expect(screen.getByText(label)).toBeInTheDocument();
      unmount();
    });
  });
});