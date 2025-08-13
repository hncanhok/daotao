<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Session;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/db-test', function () {
    try {
        DB::connection()->getPdo();
        return 'Kết nối thành công tới database: ' . DB::connection()->getDatabaseName();
    } catch (\Exception $e) {
        return 'Lỗi kết nối: ' . $e->getMessage();
    }
});

Route::get('/auth/azure', function () {
    return Socialite::driver('azure')->redirect(); // ✅ OK
});

Route::get('/auth/azure/callback', function () {
    $azureUser = Socialite::driver('azure')->user();

    // Lấy thông tin email từ Azure
    $madangnhap = $azureUser->getEmail();

    $user = User::where('userEmail', $madangnhap)->first();
    if ($user) {
        // Lưu access_token 
        $user->azure_access_token  = $azureUser->token ?? null;        
        $user->save();
        // Đăng nhập user vào hệ thống Laravel
        Auth::login($user);

        // Tạo token truy cập API (nếu dùng Laravel Sanctum)

        $token = '';
        if (empty($user->ID)) {
            throw new \Exception('User chưa tồn tại trong database, không thể tạo token.');
        } else {
            $token = $user->createToken('azure-token')->plainTextToken;
        }

        $redirectUrl = 'https://daotao2.alphanam.com/sso-callback?' . http_build_query([
            'token' => $token,
            'isUser' => true,
            'userEmail' => $user->UserEmail,
            'useID' => $user->ID,
            'screptionID' => $user->UserSelectID,
            'userName' => $user->UserName,
        ]);

        return redirect($redirectUrl);
    } else {
        throw new \Exception('User chưa tồn tại trong database, không thể tạo token.');
    }
});

Route::get('/check-auth', function () {
    if (!Auth::check()) {
        return ['authenticated' => false];
    }
    $token = Auth::user()->azure_access_token;

    $res = Http::withToken($token)->get('https://graph.microsoft.com/v1.0/me');
    if ($res->status() === 401) {
        Auth::logout();
        session()->invalidate();
        return ['authenticated' => false];
    }
    return ['authenticated' => true];
});

Route::get('/azure/front-channel-logout', function () {
    Auth::logout();
    session()->invalidate();
    session()->regenerateToken();
    return response('OK', 200);
});

