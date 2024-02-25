from unittest.mock import MagicMock
from unittest import mock, TestCase

class TestCleanup(TestCase):
    @mock.patch("psycopg2.connect")
    def test_cleanup_calls_commit_on_connection(self, mock_psycopg2_connect):
            from ..handlers import cleanup
            connection_mock = MagicMock()
            cursor_mock = MagicMock()
            cleanup(connection_mock, cursor_mock)
            connection_mock.commit.assert_called()

    @mock.patch("psycopg2.connect")
    def test_cleanup_calls_close_on_cursor(self, mock_psycopg2_connect):
            from ..handlers import cleanup
            connection_mock = MagicMock()
            cursor_mock = MagicMock()
            cleanup(connection_mock, cursor_mock)
            cursor_mock.close.assert_called()

