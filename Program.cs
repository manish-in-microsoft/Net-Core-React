///
/// Permission is hereby granted, free of charge, to any person obtaining a copy of
/// this software and associated documentation files (the "Software"), to deal in the
/// Software without restriction, including without limitation the rights to use, copy,
/// modify, merge, publish, distribute, sublicense, and/or sell copies of the Software,
/// and to permit persons to whom the Software is furnished to do so, subject to the
/// following conditions:
///
/// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
/// INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
/// PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
/// HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
/// CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
/// OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
///

using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

namespace Org.Example.Membership
{
  /// <summary>
  /// Application entry point.
  /// </summary>
  public class Program
  {
    /// <summary>
    /// Main application entry point.
    /// </summary>
    /// <param name="args">Command-line arguments passed to the application.</param>
    public static void Main(string[] args)
    {
      CreateHostBuilder(args).Build().Run();
    }

    /// <summary>
    /// Creates a web host.
    /// </summary>
    /// <param name="args">Arguments to be passed to the host.</param>
    /// <returns>An <see cref="IHostBuilder"/>.</returns>
    public static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
            .ConfigureWebHostDefaults(webBuilder =>
            {
              webBuilder.UseStartup<Startup>();
            });
  }
}